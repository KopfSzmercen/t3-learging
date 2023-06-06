import { Button, Center, Modal, Stack, Text } from "@mantine/core";
import errorNotification from "~/components/common/ui/ErrorNotification";
import successNotification from "~/components/common/ui/SuccessNotification";
import { api } from "~/utils/api";

interface IDeleteStudentModalProps {
  isOpen: boolean;
  gradeId: string | undefined;
  studentId: string | undefined;
  closeModal: () => void;
  refetch: () => void;
}

const DeleteStudentGradeModal = ({
  closeModal,
  gradeId,
  studentId,
  isOpen,
  refetch,
}: IDeleteStudentModalProps) => {
  if ((!gradeId || !studentId) && isOpen)
    throw new Error("Invalid subject metadata.");

  const deleteGradeMutation = api.teacher.deleteStudentGrade.delete.useMutation(
    {
      onSuccess: () => {
        successNotification("Success!");
        void refetch();
        closeModal();
      },
      onError: (e) => {
        errorNotification(e?.message || "Error.");
      },
    }
  );

  return (
    <Modal onClose={closeModal} opened={isOpen} title="Delete grade" size="md">
      <Center className="py-10">
        <Text size="xl">Are You sure to delete grade?</Text>
      </Center>

      <Stack>
        <Center sx={{ gap: 15 }}>
          <Button
            loading={deleteGradeMutation.isLoading}
            onClick={() => {
              deleteGradeMutation.mutate({
                gradeId: gradeId as string,
                studentId: studentId as string,
              });
            }}
          >
            Yes
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              closeModal();
            }}
          >
            No
          </Button>
        </Center>
      </Stack>
    </Modal>
  );
};

export default DeleteStudentGradeModal;
