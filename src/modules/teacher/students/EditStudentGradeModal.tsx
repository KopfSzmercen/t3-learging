import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Center, Modal, Stack, Text } from "@mantine/core";
import { GRADE_SCALE } from "@prisma/client";
import { useRouter } from "next/router";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import InputSelectForm from "~/components/common/form/InputSelectForm";
import InputTextareaForm from "~/components/common/form/InputTextareaForm";
import errorNotification from "~/components/common/ui/ErrorNotification";
import successNotification from "~/components/common/ui/SuccessNotification";
import { api } from "~/utils/api";

const gradeScalesStringArrayFromEnum = Object.keys(GRADE_SCALE);

const EditStudentGradeSchema = z.object({
  subjectId: z.string().nonempty(),
  scale: z
    .string()
    .refine((scale) => gradeScalesStringArrayFromEnum.includes(scale)),
  description: z.string().optional(),
});

type TEditStudentGradeSchema = z.infer<typeof EditStudentGradeSchema>;

interface IEditStudentGradeModalProps {
  isOpen: boolean;
  gradeId: string;
  studentId: string;
  description: string;
  scale: GRADE_SCALE;
  closeModal: () => void;
  refetch: () => void;
}

const EditStudentGradeModal = ({
  closeModal,
  isOpen,
  refetch,
  gradeId,
  studentId,
  description,
  scale,
}: IEditStudentGradeModalProps) => {
  const router = useRouter();

  const methods = useForm<TEditStudentGradeSchema>({
    resolver: zodResolver(EditStudentGradeSchema),
    defaultValues: {
      description,
      scale,
      subjectId: "",
    },
  });

  const editStudentGradeMutation =
    api.teacher.editStudentGrade.edit.useMutation({
      onSuccess: () => {
        refetch();
        successNotification("Student added successfully!");
        closeModal();
      },
      onError: (e) => {
        errorNotification(e?.message || "Error.");
      },
    });

  const onSubmit: SubmitHandler<TEditStudentGradeSchema> = (data) => {
    editStudentGradeMutation.mutate({
      ...data,
      studentId,
      gradeId,
    });
  };

  const { data: teachingSubjects, isLoading: areTechingSubjectsLoading } =
    api.teacher.getTeachingSubjects.getTeachingSubjects.useQuery();

  if (!router.isReady) return <></>;

  return (
    <Modal onClose={closeModal} opened={isOpen} title="Edit grade" size="auto">
      <Center className="py-10">
        <Text size="xl">Edit grade</Text>
      </Center>

      <Stack className="w-[80vw] max-w-[1000px]">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Stack sx={{ gap: 15 }}>
              <InputSelectForm
                name="subjectId"
                required
                data={
                  teachingSubjects && !areTechingSubjectsLoading
                    ? teachingSubjects.map((teachingSubject) => ({
                        value: teachingSubject.id,
                        label: teachingSubject.name,
                      }))
                    : []
                }
                placeholder="Subject name"
                label="Subject name"
              />

              <InputSelectForm
                name="scale"
                required
                data={Object.keys(GRADE_SCALE)}
                placeholder="Grade scale"
                label="Grade scale"
              />

              <InputTextareaForm
                name="description"
                placeholder="Grade description"
                minRows={5}
              />

              <Button
                type="submit"
                loading={editStudentGradeMutation.isLoading}
              >
                Save
              </Button>
            </Stack>
          </form>
        </FormProvider>
      </Stack>
    </Modal>
  );
};

export default EditStudentGradeModal;
