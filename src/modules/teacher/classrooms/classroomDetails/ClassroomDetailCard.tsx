import {
  ActionIcon,
  Skeleton,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/router";
import { AiFillEdit } from "react-icons/ai";
import ApiError from "~/components/common/ui/ApiError";
import ContentPaper from "~/components/common/ui/ContentPaper";
import EditClassroomModal from "~/modules/teacher/classrooms/classroomDetails/EditClassroomDetailsModal";
import { api } from "~/utils/api";

const ClassroomDetailCard = () => {
  const router = useRouter();
  const theme = useMantineTheme();

  const { isLoading, data, refetch, error } =
    api.teacher.getClassrromById.get.useQuery({
      classroomId: router.query.classroomId as string,
    });

  const [isEditFormModalOpen, { open: openFormModal, close: closeFormModal }] =
    useDisclosure(false);

  if (isLoading)
    return <Skeleton className="h-[400px] w-[40vw]">lorem</Skeleton>;

  if (error) return <ApiError errorData={error.data} message={error.message} />;

  if (data) {
    return (
      <>
        <ContentPaper>
          <ActionIcon
            color={theme.primaryColor}
            variant="filled"
            className="ml-auto"
            onClick={() => {
              openFormModal();
            }}
          >
            <AiFillEdit />
          </ActionIcon>
          <Stack>
            <Title className="text-xl xl:text-3xl">
              <Text color={theme.primaryColor} span>
                Classrom name:{" "}
              </Text>
              {data?.name}
            </Title>

            <Text>
              <Text color={theme.primaryColor} span>
                Max number of students:{" "}
              </Text>
              {data?.maxNumberOfStudents}
            </Text>
          </Stack>
        </ContentPaper>
        <EditClassroomModal
          closeModal={closeFormModal}
          isOpen={isEditFormModalOpen}
          name={data?.name}
          maxNumberOfStudents={data.maxNumberOfStudents}
          refetch={refetch}
        />
      </>
    );
  }

  return <></>;
};

export default ClassroomDetailCard;
