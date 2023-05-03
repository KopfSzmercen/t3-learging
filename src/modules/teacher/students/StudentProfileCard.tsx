import { Stack, Text, useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";
import ContentPaper from "~/components/common/ui/ContentPaper";
import { api } from "~/utils/api";

const StudentProfileCard = () => {
  const router = useRouter();
  const studentId = router.query.studentId as string;
  const theme = useMantineTheme();

  const { isLoading, data } = api.teacher.getStudent.get.useQuery({
    studentId: studentId,
  });

  return (
    <ContentPaper isLoading={isLoading}>
      <Stack>
        <Text className="text-2xl font-bold" color={theme.primaryColor}>
          {data?.firstName} {data?.lastName}
        </Text>

        <Text className="text-xl font-bold">
          Received grades: {data?._count.receivedGrades}
        </Text>
      </Stack>
    </ContentPaper>
  );
};

export default StudentProfileCard;
