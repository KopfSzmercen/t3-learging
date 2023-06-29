import { Card, Grid, Group, Rating, Text } from "@mantine/core";
import Image, { type StaticImageData } from "next/image";
import person1 from "public/images/random-person-1.jpg";
import person2 from "public/images/random-person-2.jpg";
import person3 from "public/images/random-person-3.jpg";

const RatingCard = ({ image }: { image: StaticImageData }) => {
  return (
    <Grid.Col className="md:max-w-[250px]" span="auto">
      <Card shadow="sm" padding="lg" radius="md">
        <Card.Section className="p-3 text-center">
          <Image
            src={image}
            alt="Norway"
            style={{
              borderRadius: "50%",
            }}
            placeholder="blur"
          />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text size="sm" color="dimmed">
            With Fjord Tours you can explore more of the magical fjord
            landscapes with tours and activities on and around the fjords of
            Norway
          </Text>
        </Group>

        <Card.Section className="p-2 text-center">
          <Rating defaultValue={5} readOnly fractions={2} className="mx-auto" />
        </Card.Section>
      </Card>
    </Grid.Col>
  );
};

const RatingSection = () => {
  return (
    <Grid>
      <RatingCard image={person1} />

      <RatingCard image={person2} />

      <RatingCard image={person3} />
    </Grid>
  );
};

export default RatingSection;
