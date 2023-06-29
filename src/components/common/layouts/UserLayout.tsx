import {
  AppShell,
  Burger,
  Button,
  Header,
  MediaQuery,
  Navbar,
  Skeleton,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import LogoImage from "public/images/main-logo.png";
import { useState } from "react";
import { MdRoomPreferences } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import { FooterLinks } from "~/components/common/layouts/Footer";
import ColorSchemeToggler from "~/components/common/ui/ColorSchemeToggler";
import MainLink from "~/components/common/ui/MainLink";

export interface IUserLayout {
  children: React.ReactNode;
}

const UserLayout: React.FC<IUserLayout> = ({ children }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  const { data: session, status } = useSession();

  if (status === "unauthenticated") void router.push("/");

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      void router.push("/");
    } catch (error) {
      notifications.show({
        message: "An error has occured.",
        title: "Error",
      });
    }
  };

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
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Navbar.Section>
            <Text className="font-bold" size="lg">
              Hello {session?.user.email}
            </Text>
          </Navbar.Section>
          <Navbar.Section grow mt="md">
            <Link href="/teacher/dashboard" className="no-underline">
              <MainLink label="Dashboard" icon={<RiDashboardLine />} />
            </Link>

            <Link href="/teacher/classrooms" className="no-underline">
              <MainLink label="Classrooms" icon={<MdRoomPreferences />} />
            </Link>
          </Navbar.Section>
          <Navbar.Section>{/* Footer with user */}</Navbar.Section>
        </Navbar>
      }
      footer={<FooterLinks />}
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
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

            <div className="ml-auto flex items-center gap-5">
              <ColorSchemeToggler />
              <Button onClick={handleLogout}>Sign out</Button>
            </div>
          </div>
        </Header>
      }
    >
      {status === "loading" ? (
        <main>
          {
            <Skeleton visible className="h-[90vw]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
              voluptatibus quisquam mollitia dolor fugit in odit repudiandae
              saepe maxime fuga.
            </Skeleton>
          }
        </main>
      ) : (
        <main>{children}</main>
      )}
    </AppShell>
  );
};

export const getServerSideProps = () => {
  return {
    props: {},
  };
};

export default UserLayout;
