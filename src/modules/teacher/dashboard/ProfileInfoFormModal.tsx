import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Center, Modal, Stack, Text } from "@mantine/core";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import InputDateForm from "~/components/common/form/InputDateForm";
import InputTextForm from "~/components/common/form/InputTextForm";
import errorNotification from "~/components/common/ui/ErrorNotification";
import successNotification from "~/components/common/ui/SuccessNotification";
import { api } from "~/utils/api";

const EditProfileSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  dateOfBirth: z.date(),
});

type TEditProfileSchema = z.infer<typeof EditProfileSchema>;

interface IProfileInfoFormModalProps {
  isOpen: boolean;
  closeModal: () => void;
  dateOfBirth: Date | null;
  firstName: string | null;
  lastName: string | null;
  refetch: () => void;
}

export const ProfileInfoFormModal = ({
  closeModal,
  isOpen,
  ...props
}: IProfileInfoFormModalProps) => {
  const methods = useForm<TEditProfileSchema>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      ...(props.dateOfBirth && { dateOfBirth: props.dateOfBirth }),
      ...(props.firstName && { firstName: props.firstName }),
      ...(props.lastName && { lastName: props.lastName }),
    },
  });

  const updateProfileMutation =
    api.teacher.updateTeacherProfile.getTeacherProfile.useMutation({
      onSuccess: () => {
        props.refetch();
        successNotification("Changes saved successfully!");
      },
      onError: (e) => {
        errorNotification(e?.message || "Error.");
      },
    });

  const onSubmit: SubmitHandler<TEditProfileSchema> = (data) => {
    updateProfileMutation.mutate(data);
  };

  return (
    <Modal onClose={closeModal} opened={isOpen} title="My profile" size="auto">
      <Center className="py-10">
        <Text size="xl">Edit your profile here</Text>
      </Center>
      <Stack className="w-[80vw] max-w-[1000px]">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Stack sx={{ gap: 15 }}>
              <InputTextForm
                name="firstName"
                required
                placeholder="Your first name"
                label="First name"
              />

              <InputTextForm
                name="lastName"
                required
                placeholder="Your last name"
                label="Last name"
              />

              <InputDateForm
                name="dateOfBirth"
                required
                placeholder="Your date of birth"
                label="Date of birth"
              />
              <Button type="submit" loading={updateProfileMutation.isLoading}>
                Save changes
              </Button>
            </Stack>
          </form>
        </FormProvider>
      </Stack>
    </Modal>
  );
};
