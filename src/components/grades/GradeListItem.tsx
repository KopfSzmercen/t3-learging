import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { type Grade } from "@prisma/client";
import { format } from "date-fns";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import GradeBadge from "~/components/common/ui/GradeBadge";
import DeleteStudentGradeModal from "~/modules/teacher/students/DeleteStudentGradeModal";
import EditStudentGradeModal from "~/modules/teacher/students/EditStudentGradeModal";

const GradeListItem = ({
  grade,
  shouldDisplayAddedAtColumn,
  refetch,
}: {
  grade: Grade;
  shouldDisplayAddedAtColumn: boolean;
  refetch: () => void;
}) => {
  const [
    isDeleteModalOpen,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);

  const [isEditModalOpen, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);

  return (
    <>
      <tr key={grade.id}>
        <td className="m-0 flex  w-[80px] gap-3">
          <ActionIcon
            onClick={() => {
              openDeleteModal();
            }}
          >
            <RiDeleteBin5Line />
          </ActionIcon>

          <ActionIcon
            onClick={() => {
              openEditModal();
            }}
          >
            <MdEdit />
          </ActionIcon>
        </td>

        <td>
          <GradeBadge value={grade.value} />
        </td>
        <td>{grade.subjectName}</td>
        {shouldDisplayAddedAtColumn && (
          <td>{format(grade.createdAt, "dd-MM-yyyy HH:mm")}</td>
        )}
      </tr>

      <DeleteStudentGradeModal
        closeModal={closeDeleteModal}
        gradeId={grade.id}
        isOpen={isDeleteModalOpen}
        refetch={refetch}
        studentId={grade.studentProfileId}
      />

      <EditStudentGradeModal
        closeModal={closeEditModal}
        gradeId={grade.id}
        isOpen={isEditModalOpen}
        refetch={refetch}
        studentId={grade.studentProfileId}
        description={grade.description ?? ""}
        scale={grade.value}
      />
    </>
  );
};

export default GradeListItem;
