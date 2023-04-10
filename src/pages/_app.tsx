import type { ColorScheme } from "@mantine/core";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { getCookie, setCookie } from "cookies-next";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import { useState } from "react";
import type { NextPageWithLayout } from "~/components/common/layouts/NextPageWithLayout";
import { RouterTransition } from "~/components/common/ui/RouterTransition";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const MyApp = (
  props: AppProps & { colorScheme: ColorScheme } & {
    session: Session;
  }
) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    //eslint-disable-next-line
    props.pageProps.colorScheme
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
    (props.Component as NextPageWithLayout).getLayout ?? ((page) => page);

  return (
    <>
      <SessionProvider session={props.session}>
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
            <RouterTransition />
            <Notifications />
            {getLayout(<props.Component {...props.pageProps} />)}
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
    session: null,
    Component: appContext.Component,
    pageProps: {
      colorScheme: getCookie("mantine-color-scheme", appContext.ctx) || "light",
    },
  };
};
export default api.withTRPC(MyApp);
