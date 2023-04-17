import { Center, Stack, Title } from "@mantine/core";
import { MdMeetingRoom } from "react-icons/md";
import { type NextPageWithLayout } from "~/components/common/layouts/NextPageWithLayout";
import UserLayout from "~/components/common/layouts/UserLayout";
import ClassroomsList from "~/modules/teacher/classrooms/ClassroomsList";

const Index: NextPageWithLayout = () => {
  return (
    <Center className="mt-2">
      <Stack sx={{ gap: 40 }}>
        <div className="md:mx-none mx-auto flex flex-row gap-2">
          <Title>Your classrooms</Title>
          <div className="mt-2">
            <Title c="violet">
              <MdMeetingRoom />
            </Title>
          </div>
        </div>
        <ClassroomsList />
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
