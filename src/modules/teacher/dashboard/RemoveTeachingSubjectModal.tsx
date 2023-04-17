import { Button, Center, Modal, Stack, Text } from "@mantine/core";
import React from "react";
import errorNotification from "~/components/common/ui/ErrorNotification";
import successNotification from "~/components/common/ui/SuccessNotification";
import { api } from "~/utils/api";

interface IRemoveTeachingSubjectModalProps {
  isOpen: boolean;
  subjectName: string | undefined;
  subjectId: string | undefined;
  closeModal: () => void;
  refetch: () => void;
}

const RemoveTeachingSubjectModal = ({
  closeModal,
  isOpen,
  refetch,
  subjectName,
  subjectId,
}: IRemoveTeachingSubjectModalProps) => {
  if ((!subjectId || !subjectName) && isOpen)
    throw new Error("Invalid subject metadata.");

  const removeSubjectMutation =
    api.teacher.removeTeachingSubject.remove.useMutation({
      onSuccess: () => {
        successNotification("Successfully removed subject.");
        void refetch();
        closeModal();
      },
      onError: (e) => {
        errorNotification(e?.message || "Error.");
      },
    });
  return (
    <Modal
      onClose={closeModal}
      opened={isOpen}
      title="Remove Teaching subject"
      size="lg"
    >
      <Center className="py-10">
        <Text size="xl">
          Are You sure to remove{" "}
          <Text span inherit className="font-semibold">
            {subjectName}{" "}
          </Text>
          from the list?
        </Text>
      </Center>
      <Stack>
        <Center sx={{ gap: 15 }}>
          <Button
            onClick={() => {
              removeSubjectMutation.mutate({
                teachinSubjectId: subjectId as string,
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

export default RemoveTeachingSubjectModal;
