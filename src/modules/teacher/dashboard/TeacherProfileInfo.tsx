import {
  ActionIcon,
  Button,
  Center,
  Paper,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { AiFillEdit } from "react-icons/ai";
import { ProfileInfoFormModal } from "~/modules/teacher/dashboard/ProfileInfoFormModal";
import { api } from "~/utils/api";

const isTeacherProfileSetUp = (data: { [key: string]: unknown }) => {
  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (!data[prop]) return false;
    }
  }
  return true;
};

const TeacherProfileInfo = () => {
  const session = useSession();

  const { isLoading, data, refetch } =
    api.teacher.getTeacherProfile.getTeacherProfile.useQuery({
      userId: session.data?.user.id as string,
    });

  const [isFormModalOpen, { open: openFormModal, close: closeFormModal }] =
    useDisclosure(false);

  if (isLoading) return <Skeleton>lorem</Skeleton>;

  const isProfileSetUp = data && isTeacherProfileSetUp(data);

  return (
    <Center>
      {!isProfileSetUp && (
        <Paper className=" w-[90vw] max-w-[1000px] p-5 md:w-[70vw]">
          <Center className="flex flex-col gap-5">
            <Text size="xl">Your profile has not been set up yet.</Text>
            <Button onClick={() => openFormModal()} className="w-[300px]">
              Do it now!
            </Button>
          </Center>
        </Paper>
      )}

      {isProfileSetUp && data && (
        <Paper className="md:text-md w-[90vw] max-w-[1000px] p-5 text-sm md:w-[70vw]">
          <ActionIcon
            className="ml-auto"
            color="violet"
            variant="filled"
            onClick={() => openFormModal()}
          >
            <AiFillEdit />
          </ActionIcon>
          <Center>
            <h1>Your profile details</h1>
          </Center>
          <Stack sx={{ gap: 12 }} className="mt-5">
            <Title order={3}>
              <Text span c="violet" inherit>
                First name:{" "}
              </Text>
              {data.firstName}
            </Title>

            <Title order={3}>
              <Text span c="violet" inherit>
                Last name:{" "}
              </Text>
              {data.lastName}
            </Title>
            {/* eslint-disable-next-line */}
            <Title order={3}>
              <Text span c="violet" inherit>
                Date of birth:{" "}
              </Text>
              {format(data.dateOfBirth as Date, "dd-MM-yyyy")}
            </Title>
          </Stack>
        </Paper>
      )}

      {data && (
        <ProfileInfoFormModal
          closeModal={closeFormModal}
          isOpen={isFormModalOpen}
          {...data}
          refetch={refetch}
        />
      )}
    </Center>
  );
};

export default TeacherProfileInfo;
