import {
  ActionIcon,
  Button,
  Center,
  Pagination,
  Skeleton,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import AddClassroomModal from "~/modules/teacher/classrooms/AddClassroomModal";
import ClassroomCard from "~/modules/teacher/classrooms/ClassroomCard";
import { api } from "~/utils/api";

const ClassroomsList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [skip, setSkip] = useState(0);
  const [pageSize, setPageSize] = useState(12);

  const theme = useMantineTheme();

  const grid1Column = useMediaQuery(
    `(max-width: 1300px) and (min-width: 0px)`,
    false,
    {
      getInitialValueInEffect: false,
    }
  );

  const grid2Columns = useMediaQuery(
    `(max-width: 1660px) and (min-width: 1301px)`,
    false,
    {
      getInitialValueInEffect: false,
    }
  );

  const grid3Columns = useMediaQuery(
    `(max-width: 2300px) and (min-width: 1661px)`,
    false,
    {
      getInitialValueInEffect: false,
    }
  );

  const grid4Columns = !grid2Columns && !grid3Columns && !grid1Column;

  const [isFormModalOpen, { open: openFormModal, close: closeFormModal }] =
    useDisclosure(false);

  const { isLoading, data, refetch } =
    api.teacher.getOwnedClassrooms.get.useQuery({
      pageNumber,
      pageSize,
      skip,
    });

  if (isLoading) return <Skeleton> La!</Skeleton>;

  if (data && data?.items.length < 1)
    return (
      <Center>
        <Stack>
          <Text>You don&apos;t have any classes yet.</Text>
          <Button
            onClick={() => {
              openFormModal();
            }}
          >
            Add one now!
          </Button>
        </Stack>

        <AddClassroomModal
          closeModal={closeFormModal}
          isOpen={isFormModalOpen}
          refetch={refetch}
        />
      </Center>
    );

  return (
    <Center>
      <Stack>
        <ActionIcon
          onClick={() => {
            openFormModal();
          }}
          className="ml-auto"
          color={theme.primaryColor}
          variant="filled"
        >
          <MdOutlineAdd />
        </ActionIcon>
        <div
          className={`grid gap-4 xl:gap-10 
          ${grid4Columns ? "grid-cols-4" : ""}
          ${grid3Columns ? "grid-cols-3" : ""}
          ${grid2Columns ? "grid-cols-2" : ""}
          ${grid1Column ? "grid-cols-1" : ""}
          `}
        >
          {data?.items.map((classroom) => {
            return (
              <ClassroomCard
                key={classroom.id}
                id={classroom.id}
                name={classroom.name}
                numberOfStudents={classroom.maxNumberOfStudents}
              />
            );
          })}
        </div>

        {data?.totalPages && data?.totalPages > 1 && (
          <Pagination
            value={pageNumber}
            onChange={setPageNumber}
            total={data?.totalPages}
            className="mx-auto mt-10"
          />
        )}
      </Stack>

      <AddClassroomModal
        closeModal={closeFormModal}
        isOpen={isFormModalOpen}
        refetch={refetch}
      />
    </Center>
  );
};

export default ClassroomsList;
