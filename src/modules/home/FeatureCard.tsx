import { Button, Card, Group, Image, Text } from "@mantine/core";

const FeatureCard = () => {
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            height={160}
            alt="Norway"
          />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>Lorem ipsum dolor sit amet.</Text>
        </Group>

        <Text size="sm" color="dimmed">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          minus, dolores consequuntur ut magni rem et! Vel libero commodi
          excepturi.
        </Text>

        <Button variant="light" color="indigo" fullWidth mt="md" radius="md">
          Lorem, ipsum.
        </Button>
      </Card>
    </>
  );
};

export default FeatureCard;
