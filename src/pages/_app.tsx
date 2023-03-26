import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppContext, AppType } from "next/app";
import { api } from "~/utils/api";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useState } from "react";
import "~/styles/globals.css";
import type { ColorScheme } from "@mantine/core";
import type { NextPageWithLayout } from "~/components/common/layouts/NextPageWithLayout";
import { Notifications } from "@mantine/notifications";
import { getCookie, setCookie } from "cookies-next";
import App from "next/app";

const MyApp: AppType<{
  session: Session | null;
  Component: NextPageWithLayout;
  colorScheme: ColorScheme;
}> = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    pageProps.colorScheme
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookie("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

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

              primaryColor: "violet",
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

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  return {
    ...appProps,
    pageProps: {
      colorScheme: getCookie("mantine-color-scheme", appContext.ctx) || "light",
    },
  };
};
export default api.withTRPC(MyApp);
