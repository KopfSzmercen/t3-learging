import { Center, Stack } from "@mantine/core";
import { type NextPageWithLayout } from "~/components/common/layouts/NextPageWithLayout";
import UserLayout from "~/components/common/layouts/UserLayout";
import ClassroomDetailCard from "~/modules/teacher/classrooms/classroomDetails/ClassroomDetailCard";
import ClassroomStudentsList from "~/modules/teacher/classrooms/classroomDetails/ClassroomStudentsList";

const Index: NextPageWithLayout = () => {
  return (
    <Center>
      <Stack>
        <ClassroomDetailCard />
        <ClassroomStudentsList />
      </Stack>
    </Center>
  );
};

Index.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default Index;
