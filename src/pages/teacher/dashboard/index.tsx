import { type NextPageWithLayout } from "~/components/common/layouts/NextPageWithLayout";
import UserLayout from "~/components/common/layouts/UserLayout";
import TeacherProfileInfo from "~/modules/teacher/dashboard/TeacherProfileInfo";

const Index: NextPageWithLayout = () => {
  return <TeacherProfileInfo />;
};

Index.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default Index;

//eslint-disable-next-line
export async function getServerSideProps() {
  return {
    props: {},
  };
}
