import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

function ColorSchemeToggler() {
  const colorSchemeObject = useMantineColorScheme();
  const dark = colorSchemeObject.colorScheme === "dark";

  return (
    <ActionIcon
      variant="outline"
      color={dark ? "yellow" : "blue"}
      onClick={() => colorSchemeObject.toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? (
        <BsFillSunFill size="1.1rem" />
      ) : (
        <BsFillMoonStarsFill size="1.1rem" />
      )}
    </ActionIcon>
  );
}

export default ColorSchemeToggler;
