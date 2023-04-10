import {
  ActionIcon,
  Button,
  Card,
  Center,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import React from "react";
import { api } from "~/utils/api";
import { format } from "date-fns";
import { useDisclosure } from "@mantine/hooks";
import { ProfileInfoFormModal } from "~/modules/teacher/dashboard/ProfileInfoFormModal";
import { AiFillEdit } from "react-icons/ai";

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

  if (isLoading) return <Skeleton radius="xl" width="70%" height="50%" />;

  if (!data) return <></>;

  const isProfileSetUp = isTeacherProfileSetUp(data);

  return (
    <Center>
      {!isProfileSetUp && (
        <Stack>
          <Text size="xl">Your profile has not been set up yet.</Text>
          <Button onClick={() => openFormModal()}>Do it now!</Button>
        </Stack>
      )}

      {isProfileSetUp && (
        <Card className="text-md w-[70vw] max-w-[1000px]">
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
        </Card>
      )}
      <ProfileInfoFormModal
        closeModal={closeFormModal}
        isOpen={isFormModalOpen}
        {...data}
        refetch={refetch}
      />
    </Center>
  );
};

export default TeacherProfileInfo;
