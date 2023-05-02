import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Center, Modal, Stack, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import InputTextForm from "~/components/common/form/InputTextForm";
import errorNotification from "~/components/common/ui/ErrorNotification";
import successNotification from "~/components/common/ui/SuccessNotification";
import { api } from "~/utils/api";

interface IAddStudentToClassroomModalProps {
  isOpen: boolean;
  closeModal: () => void;
  refetch: () => void;
}

const AddStudentToClassroomSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
});

type TAddStudentToClassroomSchema = z.infer<typeof AddStudentToClassroomSchema>;

const AddStudentToClassroomModal = ({
  closeModal,
  isOpen,
  refetch,
}: IAddStudentToClassroomModalProps) => {
  const router = useRouter();

  const methods = useForm<TAddStudentToClassroomSchema>({
    resolver: zodResolver(AddStudentToClassroomSchema),
  });

  const addStudentToClassroomMutation =
    api.teacher.addStudentToClassroom.add.useMutation({
      onSuccess: () => {
        refetch();
        successNotification("Class edited successfully!");
        closeModal();
        methods.reset({ firstName: "", lastName: "" });
      },
      onError: (e) => {
        errorNotification(e?.message || "Error.");
      },
    });

  if (!router.isReady) return <></>;

  const onSubmit: SubmitHandler<TAddStudentToClassroomSchema> = (data) => {
    addStudentToClassroomMutation.mutate({
      ...data,
      classroomId: router.query.classroomId as string,
    });
  };

  return (
    <Modal onClose={closeModal} opened={isOpen} title="Add student" size="auto">
      <Center className="py-10">
        <Text size="xl">Add student</Text>
      </Center>
      <Stack className="w-[80vw] max-w-[1000px]">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Stack sx={{ gap: 15 }}>
              <InputTextForm
                name="firstName"
                required
                placeholder="Student first name"
                label="Student first name"
              />

              <InputTextForm
                name="lastName"
                required
                placeholder="Student last name"
                label="Student last name"
              />

              <Button
                type="submit"
                loading={addStudentToClassroomMutation.isLoading}
              >
                Add
              </Button>
            </Stack>
          </form>
        </FormProvider>
      </Stack>
    </Modal>
  );
};

export default AddStudentToClassroomModal;
