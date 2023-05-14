import {
  ActionIcon,
  Pagination,
  Skeleton,
  Table,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, usePagination } from "@mantine/hooks";
import { useRouter } from "next/router";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import ApiError from "~/components/common/ui/ApiError";
import ContentPaper from "~/components/common/ui/ContentPaper";
import AddStudentToClassroomModal from "~/modules/teacher/classrooms/classroomDetails/AddStudentModal";
import { api } from "~/utils/api";

const ClassroomStudentsList = () => {
  const theme = useMantineTheme();
  const pagination = usePagination({ total: 10, initialPage: 1 });
  const router = useRouter();

  const { data, isLoading, refetch, error } =
    api.teacher.getListOfStudentsInClassroom.get.useQuery({
      pageNumber: pagination.active,
      classroomId: router.query.classroomId as string,
      pageSize: 10,
    });

  const [
    isAddStudentModalOpen,
    { open: openFormModal, close: closeFormModal },
  ] = useDisclosure(false);

  if (error) return <ApiError errorData={error.data} message={error.message} />;

  return (
    <>
      <ContentPaper>
        <div className="flex pb-5">
          <Title color={theme.primaryColor} className="text-xl xl:text-3xl">
            Students
          </Title>
          <ActionIcon
            color={theme.primaryColor}
            variant="filled"
            className="ml-auto"
            onClick={() => {
              openFormModal();
            }}
          >
            <MdOutlineAddCircleOutline />
          </ActionIcon>
        </div>

        {isLoading && <Skeleton>Lorem, ipsum.</Skeleton>}

        {!isLoading && data && (
          <>
            <Table striped highlightOnHover>
              <thead>
                <tr>
                  <th>First name</th>
                  <th>Last name</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((student) => (
                  <tr
                    key={student.id}
                    className="cursor-pointer"
                    onClick={() => {
                      void router.push(`/teacher/students/${student.id}`);
                    }}
                  >
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="align-center mt-8 flex w-full flex-col items-center">
              <Pagination
                value={pagination.active}
                onChange={pagination.setPage}
                total={data.totalPages}
              />
            </div>
          </>
        )}
      </ContentPaper>

      <AddStudentToClassroomModal
        isOpen={isAddStudentModalOpen}
        closeModal={closeFormModal}
        refetch={refetch}
      />
    </>
  );
};

export default ClassroomStudentsList;
