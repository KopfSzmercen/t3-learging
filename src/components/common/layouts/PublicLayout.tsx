import {
  AppShell,
  Burger,
  Button,
  Footer,
  Header,
  MediaQuery,
  Navbar,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { useState } from "react";
import ColorSchemeToggler from "~/components/common/ui/ColorSchemeToggler";

export interface IPublicLayout {
  children: React.ReactNode;
}

const PublicLayout: React.FC<IPublicLayout> = ({ children }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`, true, {
    getInitialValueInEffect: false,
  });

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      navbar={
        matches ? (
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            <Stack className="text-center">
              <Text className="text-2xl font-bold">Use our app right now!</Text>

              <Stack className="mt-5 w-full" spacing={30}>
                <Link href="/auth/sign-in">
                  <Button className="w-[80%]">Log in</Button>
                </Link>

                <Link href="/auth/sign-up">
                  <Button variant="outline" className="w-[80%]">
                    Sign up
                  </Button>
                </Link>
              </Stack>
            </Stack>
          </Navbar>
        ) : undefined
      }
      header={
        <Header
          height={{ base: 50, md: 70 }}
          p="md"
          className="items-between flex items-center justify-between"
        >
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>
              <Link href="/"> Home</Link>
            </Text>
          </div>
          <div className="gap- 5 flex items-center gap-5">
            <ColorSchemeToggler />

            {!matches && (
              <>
                <Link href="/auth/sign-up">
                  <Button variant="outline">Sign up</Button>
                </Link>
                <Link href="/auth/sign-in">
                  <Button>Log in</Button>
                </Link>
              </>
            )}
          </div>
        </Header>
      }
    >
      <main>{children}</main>
    </AppShell>
  );
};

export default PublicLayout;
