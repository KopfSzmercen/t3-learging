import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useState } from "react";
import "~/styles/globals.css";
import type { ColorScheme } from "@mantine/core";
import type { NextPageWithLayout } from "~/components/common/layouts/NextPageWithLayout";
import { Notifications } from "@mantine/notifications";

const MyApp: AppType<{
  session: Session | null;
  Component: NextPageWithLayout;
}> = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const getLayout =
    (Component as NextPageWithLayout).getLayout ?? ((page) => page);

  return (
    <>
      <SessionProvider session={session}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            withCSSVariables
            theme={{
              colorScheme: colorScheme,
            }}
          >
            <Notifications />
            {getLayout(<Component {...pageProps} />)}
          </MantineProvider>
        </ColorSchemeProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
