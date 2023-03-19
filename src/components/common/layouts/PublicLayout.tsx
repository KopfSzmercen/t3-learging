import {
  AppShell,
  Burger,
  Button,
  Footer,
  Header,
  MediaQuery,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import ColorSchemeToggler from "~/components/common/ui/ColorSchemeToggler";

export interface IPublicLayout {
  children: React.ReactNode;
}

const PublicLayout: React.FC<IPublicLayout> = ({ children }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
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

            <Text>Application header</Text>
          </div>
          <div className="gap- 5 flex items-center gap-5">
            <ColorSchemeToggler />
            <Button>Log in</Button>
          </div>
        </Header>
      }
    >
      <main>{children}</main>
    </AppShell>
  );
};

export default PublicLayout;
