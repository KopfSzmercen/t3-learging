import {
  Box,
  Center,
  MediaQuery,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";

const elements = [
  { position: 6, mass: 12.011, establishYear: "1998", name: "Polibuda" },
  { position: 7, mass: 14.007, establishYear: "1998", name: "Urz" },
  { position: 39, mass: 88.906, establishYear: "1998", name: "Wsiz" },
  { position: 56, mass: 137.33, establishYear: "1998", name: "UJ" },
  { position: 58, mass: 140.12, establishYear: "1998", name: "AGH" },
];

export const TableSection = () => {
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <MediaQuery
        smallerThan="md"
        styles={{
          display: "none",
        }}
      >
        <td>{element.position}</td>
      </MediaQuery>

      <td>{element.name}</td>
      <td>{element.establishYear}</td>
      <td>{element.mass}</td>
    </tr>
  ));

  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[1],
        width: "100%",
        padding: 20,
        marginTop: 80,
      }}
    >
      <Center className="mx-auto my-10 max-w-[1400px] py-[20px]">
        <div className="flex w-full flex-col items-center gap-20">
          <Text ta="center" fz="xl" className="font-s" fw={900}>
            <h2> Just see who uses us!</h2>
          </Text>
          <Table verticalSpacing="lg">
            <thead>
              <tr>
                <MediaQuery
                  smallerThan="md"
                  styles={{
                    display: "none",
                  }}
                >
                  <th>University ranking position</th>
                </MediaQuery>

                <th>University name</th>
                <th>Established</th>
                <th>Students</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </div>
      </Center>
    </Box>
  );
};
