import {
  ActionIcon,
  Button,
  Center,
  Skeleton,
  Stack,
  Table,
  Text,
  useMantineTheme,
  Paper,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { AddTeachingSubjectFormModal } from "~/modules/teacher/dashboard/AddTeachingSubjectFormModal";
import { api } from "~/utils/api";
import { MdOutlineAdd } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import RemoveTeachingSubjectModal from "~/modules/teacher/dashboard/RemoveTeachingSubjectModal";
import { useState } from "react";

const TeacherSubjects = () => {
  const session = useSession();
  const { isLoading, data, refetch } =
    api.teacher.getTeachingSubjects.getTeachingSubjects.useQuery({
      userId: session.data?.user.id as string,
    });

  const [isFormModalOpen, { open: openFormModal, close: closeFormModal }] =
    useDisclosure(false);

  const [
    isRemoveSubjectModalOpen,
    { open: openRemoveSubjectModal, close: closeRemoveSubjectModal },
  ] = useDisclosure(false);

  const [subjectToRemove, setSubjectToRemove] = useState<{
    name: string;
    id: string;
  } | null>();

  const hasTeachingSubjects = data ? data?.length > 0 : false;

  const theme = useMantineTheme();

  const shouldDisplayAlmaMateColumn = useMediaQuery(
    `(min-width: ${theme.breakpoints.sm})`,
    false,
    {
      getInitialValueInEffect: false,
    }
  );

  if (isLoading) return <Skeleton radius="xl" width="70%" height="50%" />;

  return (
    <>
      <Paper className="md:text-md w-[90vw] max-w-[1000px] p-5 text-sm md:w-[70vw]">
        <ActionIcon
          className="ml-auto"
          color="violet"
          variant="filled"
          onClick={() => openFormModal()}
        >
          <MdOutlineAdd />
        </ActionIcon>
        <Center>
          <h2>Subjects you teach:</h2>
        </Center>

        <Center>
          {!hasTeachingSubjects && (
            <Stack spacing={25}>
              <Text>You do not have teaching subjects added yet.</Text>
              <Button onClick={() => openFormModal()}>Add a subject</Button>
            </Stack>
          )}

          {hasTeachingSubjects && (
            <Table striped highlightOnHover>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Degree</th>
                  {shouldDisplayAlmaMateColumn && <th>Alma Mater</th>}
                </tr>
              </thead>
              <tbody>
                {data?.map((subject) => (
                  <tr key={subject.id}>
                    <td>
                      <ActionIcon
                        onClick={() => {
                          setSubjectToRemove({
                            name: subject.name,
                            id: subject.id,
                          });
                          openRemoveSubjectModal();
                        }}
                      >
                        <RiDeleteBin5Line />
                      </ActionIcon>
                    </td>
                    <td>{subject.name}</td>
                    <td>{subject.degree}</td>
                    {shouldDisplayAlmaMateColumn && (
                      <td>{subject.almaMater}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          <AddTeachingSubjectFormModal
            isOpen={isFormModalOpen}
            closeModal={closeFormModal}
            refetch={refetch}
          />

          <RemoveTeachingSubjectModal
            closeModal={closeRemoveSubjectModal}
            isOpen={isRemoveSubjectModalOpen}
            refetch={refetch}
            subjectName={subjectToRemove?.name}
            subjectId={subjectToRemove?.id}
          />
        </Center>
      </Paper>
    </>
  );
};

export default TeacherSubjects;
