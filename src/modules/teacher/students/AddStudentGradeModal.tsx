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

interface IAddStudentGradeModalProps {
  isOpen: boolean;
  closeModal: () => void;
  refetch: () => void;
}

const gradeScalesStringArrayFromEnum = Object.keys(GRADE_SCALE);

const AddStudentGradeSchema = z.object({
  subjectId: z.string().nonempty(),
  scale: z
    .string()
    .refine((scale) => gradeScalesStringArrayFromEnum.includes(scale)),
  description: z.string().optional(),
});

type TAddStudentGradeSchema = z.infer<typeof AddStudentGradeSchema>;

const AddStudentGradeModal = ({
  closeModal,
  isOpen,
  refetch,
}: IAddStudentGradeModalProps) => {
  const router = useRouter();
  const studentId = router.query.studentId as string;

  const methods = useForm<TAddStudentGradeSchema>({
    resolver: zodResolver(AddStudentGradeSchema),
  });

  const { data, isLoading } =
    api.teacher.getTeachingSubjects.getTeachingSubjects.useQuery();

  const addStudentGradeMutation = api.teacher.addStudentGrade.add.useMutation({
    onSuccess: () => {
      refetch();
      successNotification("Grade added successfully!");
      closeModal();
      methods.reset({ description: "", scale: "", subjectId: "" });
    },
    onError: (e) => {
      errorNotification(e?.message || "Error.");
    },
  });

  const onSubmit: SubmitHandler<TAddStudentGradeSchema> = (data) => {
    addStudentGradeMutation.mutate({
      ...data,
      studentId,
    });
  };

  return (
    <Modal onClose={closeModal} opened={isOpen} title="New grade" size="auto">
      <Center className="py-10">
        <Text size="xl">Add new grade</Text>
      </Center>
      <Stack className="w-[80vw] max-w-[1000px]">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Stack sx={{ gap: 15 }}>
              <InputSelectForm
                name="subjectId"
                required
                data={
                  data && !isLoading
                    ? data.map((teachingSubject) => ({
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

              <Button type="submit" loading={addStudentGradeMutation.isLoading}>
                Add
              </Button>
            </Stack>
          </form>
        </FormProvider>
      </Stack>
    </Modal>
  );
};

export default AddStudentGradeModal;
