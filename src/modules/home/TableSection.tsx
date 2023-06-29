import { Table } from "@mantine/core";

const elements = [
  { position: 6, mass: 12.011, symbol: "1998", name: "Polibuda" },
  { position: 7, mass: 14.007, symbol: "1998", name: "Urz" },
  { position: 39, mass: 88.906, symbol: "1998", name: "Wsiz" },
  { position: 56, mass: 137.33, symbol: "1998", name: "UJ" },
  { position: 58, mass: 140.12, symbol: "1998", name: "AGH" },
];

export const TableSection = () => {
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
      <td>{element.mass}</td>
    </tr>
  ));

  return (
    <Table verticalSpacing="lg">
      <thead>
        <tr>
          <th>University ranking position</th>
          <th>University name</th>
          <th>Established</th>
          <th>Students</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};
