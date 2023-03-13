import { Box } from "@mantine/core";
import Head from "next/head";
import type { NextPageWithLayout } from "~/components/common/layouts/NextPageWithLayout";
import UserLayout from "~/components/common/layouts/UserLayout";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Box>
        <h1>Hello world!</h1>
      </Box>
    </>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};
