import {
  ActionIcon,
  Pagination,
  Skeleton,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, usePagination } from "@mantine/hooks";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { MdOutlineAdd } from "react-icons/md";
import ApiError from "~/components/common/ui/ApiError";
import ContentPaper from "~/components/common/ui/ContentPaper";
import GradeBadge from "~/components/common/ui/GradeBadge";
import AddStudentGradeModal from "~/modules/teacher/students/AddStudentGradeModal";
import { api } from "~/utils/api";

const StudentGradesList = () => {
  const theme = useMantineTheme();
  const router = useRouter();

  const pagination = usePagination({ total: 10, initialPage: 1 });

  const { data, isLoading, refetch, error } =
    api.teacher.getStudentGrades.get.useQuery({
      pageNumber: pagination.active,
      studentId: router.query.studentId as string,
      pageSize: 10,
    });

  const [isFormModalOpen, { open: openFormModal, close: closeFormModal }] =
    useDisclosure(false);

  if (error) return <ApiError errorData={error.data} message={error.message} />;

  return (
    <>
      <ContentPaper>
        <div className="flex items-center">
          <Text className="text-2xl font-bold" color={theme.primaryColor}>
            Grades
          </Text>

          <ActionIcon
            className="ml-auto"
            color={theme.primaryColor}
            variant="filled"
            onClick={() => {
              openFormModal();
            }}
          >
            <MdOutlineAdd />
          </ActionIcon>
        </div>

        {isLoading && <Skeleton>Lorem, ipsum.</Skeleton>}

        {data && (
          <>
            <Table striped highlightOnHover className="mt-7">
              <thead>
                <tr>
                  <th>Value</th>
                  <th>Subject</th>
                  <th>Added at</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((grade) => (
                  <tr key={grade.id}>
                    <td>
                      <GradeBadge value={grade.value} />
                    </td>
                    <td>{grade.subjectName}</td>
                    <td>{format(grade.createdAt, "dd-MM-yyyy HH:mm")}</td>
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

      <AddStudentGradeModal
        closeModal={closeFormModal}
        isOpen={isFormModalOpen}
        refetch={refetch}
      />
    </>
  );
};

export default StudentGradesList;
