import {
  ActionIcon,
  Button,
  Center,
  Grid,
  Pagination,
  Skeleton,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, usePagination } from "@mantine/hooks";
import { MdOutlineAdd } from "react-icons/md";
import ApiError from "~/components/common/ui/ApiError";
import AddClassroomModal from "~/modules/teacher/classrooms/AddClassroomModal";
import ClassroomCard from "~/modules/teacher/classrooms/ClassroomCard";
import { api } from "~/utils/api";

const ClassroomsList = () => {
  // const [pageNumber, setPageNumber] = useState(1);
  // const [skip, setSkip] = useState(0);
  // const [pageSize, setPageSize] = useState(12);

  const theme = useMantineTheme();

  const pagination = usePagination({ total: 10, initialPage: 1 });

  const [isFormModalOpen, { open: openFormModal, close: closeFormModal }] =
    useDisclosure(false);

  const { isLoading, data, refetch, error } =
    api.teacher.getOwnedClassrooms.get.useQuery({
      pageNumber: pagination.active,
      pageSize: 10,
    });

  if (isLoading) return <Skeleton> La!</Skeleton>;

  if (error) return <ApiError errorData={error.data} message={error.message} />;

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
    <Center className="max-w-[1800px]">
      <Stack>
        <div className=" w-full max-w-[1700px] pb-2">
          <ActionIcon
            onClick={() => {
              openFormModal();
            }}
            color={theme.primaryColor}
            variant="filled"
            className="ml-auto"
          >
            <MdOutlineAdd />
          </ActionIcon>
        </div>
        <Stack className="mt-2">
          <Grid className="mx-auto w-[90%]" align="center">
            {data?.items.map((classroom) => {
              return (
                <Grid.Col
                  key={classroom.id}
                  span="auto"
                  className="flex items-center justify-center lg:justify-start"
                >
                  <ClassroomCard
                    key={classroom.id}
                    id={classroom.id}
                    name={classroom.name}
                    numberOfStudents={classroom.maxNumberOfStudents}
                  />
                </Grid.Col>
              );
            })}
          </Grid>

          {data?.totalPages && data?.totalPages > 1 && (
            <Pagination
              className="mx-auto mt-6"
              value={pagination.active}
              onChange={pagination.setPage}
              total={data.totalPages}
            />
          )}
        </Stack>
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
