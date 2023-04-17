import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Center, Modal, Stack, Text } from "@mantine/core";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import InputNumberForm from "~/components/common/form/InputNumberForm";
import InputTextForm from "~/components/common/form/InputTextForm";
import errorNotification from "~/components/common/ui/ErrorNotification";
import successNotification from "~/components/common/ui/SuccessNotification";
import { api } from "~/utils/api";

interface IAddClassroomModalProps {
  isOpen: boolean;
  closeModal: () => void;
  refetch: () => void;
}

const AddClassroomSchema = z.object({
  name: z.string().nonempty(),
  numberOfStudents: z.number().int().min(1),
});

type TAddClassroomSchema = z.infer<typeof AddClassroomSchema>;

const AddClassroomModal = ({
  closeModal,
  isOpen,
  refetch,
}: IAddClassroomModalProps) => {
  const methods = useForm<TAddClassroomSchema>({
    resolver: zodResolver(AddClassroomSchema),
  });

  const addClassroomMutation = api.teacher.addClassroom.add.useMutation({
    onSuccess: () => {
      refetch();
      successNotification("Class added successfully!");
      closeModal();
    },
    onError: (e) => {
      errorNotification(e?.message || "Error.");
    },
  });

  const onSubmit: SubmitHandler<TAddClassroomSchema> = (data) => {
    addClassroomMutation.mutate(data);
  };

  return (
    <Modal
      onClose={closeModal}
      opened={isOpen}
      title="New classroom"
      size="auto"
    >
      <Center className="py-10">
        <Text size="xl">Add new classroom</Text>
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
                name="numberOfStudents"
                required
                label="Number of students"
                min={1}
              />

              <Button type="submit" loading={addClassroomMutation.isLoading}>
                Add
              </Button>
            </Stack>
          </form>
        </FormProvider>
      </Stack>
    </Modal>
  );
};

export default AddClassroomModal;
