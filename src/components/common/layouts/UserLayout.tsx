import {
  AppShell,
  Burger,
  Button,
  Footer,
  Header,
  MediaQuery,
  Navbar,
  Skeleton,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import ColorSchemeToggler from "~/components/common/ui/ColorSchemeToggler";

export interface IUserLayout {
  children: React.ReactNode;
}

const UserLayout: React.FC<IUserLayout> = ({ children }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  const { data: session, status } = useSession();

  console.log(status);

  if (status === "unauthenticated") void router.push("/");

  const handleLogout = async () => {
    const response = await signOut({ redirect: false });
    void router.push("/");
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
          <Text className="font-bold" size="lg">
            Hello {session?.user.email}
          </Text>
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
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

            <div className=" hidden items-center gap-3 md:flex">
              <Text>Application header</Text>
            </div>

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
