import Head from "next/head";
import { type NextPageWithLayout } from "~/components/common/layouts/NextPageWithLayout";
import PublicLayout from "~/components/common/layouts/PublicLayout";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
      </Head>
      <main></main>
    </>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <PublicLayout>{page}</PublicLayout>;
};
