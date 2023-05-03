import { Center, Stack } from "@mantine/core";
import { type NextPageWithLayout } from "~/components/common/layouts/NextPageWithLayout";
import UserLayout from "~/components/common/layouts/UserLayout";
import StudentGradesList from "~/modules/teacher/students/StudentGradesList";
import StudentProfileCard from "~/modules/teacher/students/StudentProfileCard";

const Index: NextPageWithLayout = () => {
  return (
    <Center>
      <Stack>
        <StudentProfileCard />

        <StudentGradesList />
      </Stack>
    </Center>
  );
};

Index.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default Index;
