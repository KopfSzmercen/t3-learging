import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Center, Modal, Stack, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import InputNumberForm from "~/components/common/form/InputNumberForm";
import InputTextForm from "~/components/common/form/InputTextForm";
import errorNotification from "~/components/common/ui/ErrorNotification";
import successNotification from "~/components/common/ui/SuccessNotification";
import { api } from "~/utils/api";

interface IEditClassroomModalProps {
  isOpen: boolean;
  name: string;
  maxNumberOfStudents: number;
  closeModal: () => void;
  refetch: () => void;
}

const EditClassroomSchema = z.object({
  name: z.string().nonempty(),
  maxNumberOfStudents: z.number().int().min(1),
});

type TEditClassroomSchema = z.infer<typeof EditClassroomSchema>;

const EditClassroomModal = ({
  closeModal,
  isOpen,
  refetch,
  name,
  maxNumberOfStudents,
}: IEditClassroomModalProps) => {
  const router = useRouter();

  const methods = useForm<TEditClassroomSchema>({
    resolver: zodResolver(EditClassroomSchema),
    defaultValues: {
      name,
      maxNumberOfStudents,
    },
  });

  const editClassroomMutation = api.teacher.editClassroom.edit.useMutation({
    onSuccess: () => {
      refetch();
      successNotification("Student added successfully!");
      closeModal();
    },
    onError: (e) => {
      errorNotification(e?.message || "Error.");
    },
  });

  if (!router.isReady) return <></>;

  const onSubmit: SubmitHandler<TEditClassroomSchema> = (data) => {
    editClassroomMutation.mutate({
      ...data,
      classroomId: router.query.classroomId as string,
    });
  };

  return (
    <Modal
      onClose={closeModal}
      opened={isOpen}
      title="New classroom"
      size="auto"
    >
      <Center className="py-10">
        <Text size="xl">Edit classroom</Text>
      </Center>
      <Stack className="w-[80vw] max-w-[1000px]">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Stack sx={{ gap: 15 }}>
              <InputTextForm
                name="name"
                required
                placeholder="Classroom name"
                label="Classroom name"
              />

              <InputNumberForm
                name="maxNumberOfStudents"
                required
                label="Number of students"
                min={1}
              />

              <Button type="submit" loading={editClassroomMutation.isLoading}>
                Edit
              </Button>
            </Stack>
          </form>
        </FormProvider>
      </Stack>
    </Modal>
  );
};

export default EditClassroomModal;
