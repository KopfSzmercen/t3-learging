import { Center, Stack } from "@mantine/core";
import { type NextPageWithLayout } from "~/components/common/layouts/NextPageWithLayout";
import UserLayout from "~/components/common/layouts/UserLayout";
import TeacherProfileInfo from "~/modules/teacher/dashboard/TeacherProfileInfo";
import TeacherSubjects from "~/modules/teacher/dashboard/TeacherSubjects";

const Index: NextPageWithLayout = () => {
  return (
    <Center>
      <Stack>
        <TeacherProfileInfo />
        <TeacherSubjects />
      </Stack>
    </Center>
  );
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
