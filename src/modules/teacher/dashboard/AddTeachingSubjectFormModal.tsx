import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Center, Modal, Stack, Text } from "@mantine/core";
import { DEGREE } from "@prisma/client";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import InputSelectForm from "~/components/common/form/InputSelectForm";
import InputTextForm from "~/components/common/form/InputTextForm";
import errorNotification from "~/components/common/ui/ErrorNotification";
import successNotification from "~/components/common/ui/SuccessNotification";
import { api } from "~/utils/api";

const AddTeachingSubjectSchema = z.object({
  name: z.string().nonempty(),
  degree: z.nativeEnum(DEGREE),
  almaMater: z.string().nonempty(),
});

type TAddTeachingSubjectSchema = z.infer<typeof AddTeachingSubjectSchema>;

interface IProfileInfoFormModalProps {
  isOpen: boolean;
  closeModal: () => void;
  refetch: () => void;
}

export const AddTeachingSubjectFormModal = ({
  closeModal,
  isOpen,
  ...props
}: IProfileInfoFormModalProps) => {
  const methods = useForm<TAddTeachingSubjectSchema>({
    resolver: zodResolver(AddTeachingSubjectSchema),
  });

  const addTeachingSubjectMutation =
    api.teacher.addTeachingSubject.addTeachingSubject.useMutation({
      onSuccess: () => {
        props.refetch();
        successNotification("Successfully added subject!");
        closeModal();
      },
      onError: (e) => {
        errorNotification(e?.message || "Error.");
      },
    });

  const onSubmit: SubmitHandler<TAddTeachingSubjectSchema> = (data) => {
    addTeachingSubjectMutation.mutate(data);
  };

  return (
    <Modal
      onClose={closeModal}
      opened={isOpen}
      title="Teaching subject"
      size="auto"
    >
      <Center className="py-10">
        <Text size="xl">Add teaching subject</Text>
      </Center>
      <Stack className="w-[80vw] max-w-[1000px]">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Stack sx={{ gap: 15 }}>
              <InputTextForm
                name="name"
                required
                placeholder="Subject name"
                label="Subject name"
              />

              <InputTextForm
                name="almaMater"
                required
                placeholder="Your Alma Mater name"
                label="Your Alma Mater name"
              />

              <InputSelectForm
                name="degree"
                placeholder="Your scientific degree"
                label="Degree"
                required
                data={[
                  {
                    value: DEGREE.BACHELOR,
                    label: "Bachelor",
                  },
                  {
                    value: DEGREE.ENGINEER,
                    label: "Engineer",
                  },
                  {
                    value: DEGREE.DOCTOR,
                    label: "Doctor",
                  },
                  {
                    value: DEGREE.PROFESSOR,
                    label: "Professor",
                  },
                ]}
              />

              <Button
                type="submit"
                loading={addTeachingSubjectMutation.isLoading}
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
