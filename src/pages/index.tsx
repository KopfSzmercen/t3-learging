import {
  Box,
  Center,
  Container,
  Grid,
  Text,
  useMantineTheme,
} from "@mantine/core";
import Head from "next/head";
import { type NextPageWithLayout } from "~/components/common/layouts/NextPageWithLayout";
import PublicLayout from "~/components/common/layouts/PublicLayout";
import FeatureCard from "~/modules/home/FeatureCard";
import Hero from "~/modules/home/Hero";
import RatingSection from "~/modules/home/RatingSection";
import { TableSection } from "~/modules/home/TableSection";

const Home: NextPageWithLayout = () => {
  const theme = useMantineTheme();
  return (
    <>
      <Head>
        <title>Create T3 App</title>
      </Head>
      <main>
        <section>
          <Center>
            <Hero />
          </Center>
        </section>

        <section>
          <Center className="mx-auto mt-16 max-w-[1800px]">
            <Grid>
              <Grid.Col span="auto">
                <FeatureCard />
              </Grid.Col>

              <Grid.Col span="auto">
                <FeatureCard />
              </Grid.Col>

              <Grid.Col span="auto">
                <FeatureCard />
              </Grid.Col>
            </Grid>
          </Center>
        </section>

        <section className="w-full">
          <Box
            sx={{
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[7]
                  : theme.colors.gray[1],
              width: "100%",
              padding: 1,
              marginTop: 80,
            }}
          >
            <Center className="mx-auto my-10 max-w-[1400px] py-[20px]">
              <div className="flex w-full flex-col items-center gap-20">
                <Text
                  // variant="gradient"
                  // gradient={{
                  //   from: theme.primaryColor,
                  //   to: "teal",
                  //   deg: 60,
                  // }}
                  ta="center"
                  fz="xl"
                  className="font-s"
                  fw={900}
                >
                  <h2> Just see who uses us!</h2>
                </Text>
                <TableSection />
              </div>
            </Center>
          </Box>
        </section>

        <section>
          <Center className="mt-20 p-10">
            <RatingSection />
          </Center>
        </section>

        <section>
          <Center className="mx-auto my-10 max-w-[800px] py-10 text-center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea iure
            enim quod culpa quae, consectetur tempore totam animi cumque aperiam
            atque omnis? Totam reprehenderit deleniti nesciunt non possimus
            modi, sequi voluptatum quaerat voluptas eaque dolorum impedit ipsam
            placeat molestias vero explicabo alias itaque facere nihil
            consectetur quisquam maxime atque. Esse.
          </Center>
        </section>
      </main>
    </>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <PublicLayout>{page}</PublicLayout>;
};
