import {
  AppShell,
  Burger,
  Button,
  Center,
  Header,
  MediaQuery,
  Navbar,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import LogoImage from "public/images/main-logo.png";
import { useState } from "react";
import { FooterLinks } from "~/components/common/layouts/Footer";
import ColorSchemeToggler from "~/components/common/ui/ColorSchemeToggler";

export interface IPublicLayout {
  children: React.ReactNode;
}

const PublicLayout: React.FC<IPublicLayout> = ({ children }) => {
  const session = useSession();
  const isLoggedIn = session.status === "authenticated";
  const router = useRouter();

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`, false, {
    getInitialValueInEffect: false,
  });

  if (isLoggedIn) void router.push("/teacher/dashboard");

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
      navbarOffsetBreakpoint="xl"
      asideOffsetBreakpoint="sm"
      footer={<FooterLinks />}
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="md"
          hidden={!opened}
          width={{ sm: 200, md: 0 }}
          display={{ md: "none" }}
        >
          <Stack className="text-center">
            <Center>
              <div className="relative h-[110px] w-[110px]">
                <Image
                  alt={"logo"}
                  fill={true}
                  src={LogoImage}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </Center>

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

            <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
              <Link href="/">
                <div className="relative h-[50px] w-[90px]">
                  <Image
                    alt={"logo"}
                    fill={true}
                    src={LogoImage}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </Link>
            </MediaQuery>
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
