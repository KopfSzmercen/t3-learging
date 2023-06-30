import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { USER_ROLE } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type DefaultJWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      role: USER_ROLE;
    } & DefaultSession["user"];
  }

  interface JWT extends DefaultJWT {
    user: {
      id: string;
      role: USER_ROLE;
    };
  }

  interface User {
    id: string;
    role: USER_ROLE;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user?.id;
        token.user = user;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role as USER_ROLE;
      session.user.id = token.id as string;
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the GITHUB provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "string", placeholder: "email@e.pl" },
        password: {
          label: "Password",
          type: "string",
          placeholder: "password",
        },
      },

      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        await new Promise((r) => {
          return setTimeout(r, 5000);
        });

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) throw new Error("User not found.");

        const isSamePass = await bcrypt.compare(password, user.password);

        if (!isSamePass) {
          throw new Error("invalid credentials");
        }

        return user;
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
