import React from "react";
import { type NextPageWithLayout } from "~/components/common/layouts/NextPageWithLayout";
import UserLayout from "~/components/common/layouts/UserLayout";

const Index: NextPageWithLayout = () => {
  return <div>Index</div>;
};

Index.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default Index;
