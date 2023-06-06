import {
  ActionIcon,
  Pagination,
  Skeleton,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery, usePagination } from "@mantine/hooks";
import { useRouter } from "next/router";
import { MdOutlineAdd } from "react-icons/md";
import ApiError from "~/components/common/ui/ApiError";
import ContentPaper from "~/components/common/ui/ContentPaper";
import GradeListItem from "~/components/grades/GradeListItem";
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

  const shouldDisplayAddedAtColumn = useMediaQuery("(min-width: 550px)");

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
                  <th></th>
                  <th>Value</th>
                  <th>Subject</th>
                  {shouldDisplayAddedAtColumn && <th>Added at</th>}
                </tr>
              </thead>
              <tbody>
                {data.items.map((grade) => (
                  <GradeListItem
                    grade={grade}
                    shouldDisplayAddedAtColumn={shouldDisplayAddedAtColumn}
                    key={grade.id}
                    refetch={refetch}
                  />
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
