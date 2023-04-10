import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Center, Stack, Text } from "@mantine/core";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import InputTextForm from "~/components/common/form/InputTextForm";
import { type NextPageWithLayout } from "~/components/common/layouts/NextPageWithLayout";
import PublicLayout from "~/components/common/layouts/PublicLayout";
import errorNotification from "~/components/common/ui/ErrorNotification";
import successNotification from "~/components/common/ui/SuccessNotification";

const SignInFormSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});

type TSignInSchema = z.infer<typeof SignInFormSchema>;

const Index: NextPageWithLayout = () => {
  const router = useRouter();

  const methods = useForm<TSignInSchema>({
    resolver: zodResolver(SignInFormSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: TSignInSchema) => {
    setIsLoading(true);
    const response = await signIn("credentials", { redirect: false, ...data });
    setIsLoading(false);

    if (response?.error) {
      errorNotification(response?.error);
    }

    if (response?.ok) {
      successNotification("Sign in successfull!");
      void router.push("/teacher/dashboard");
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <Card className="mx-auto w-full max-w-2xl p-6">
          <Center>
            <Text size="xl" className="font-bold">
              Sign in
            </Text>
          </Center>

          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <Stack sx={{ gap: 12 }}>
              <InputTextForm
                label="Email"
                placeholder="example@e.com"
                type="email"
                required
                name="email"
              />

              <InputTextForm
                label="Passowrd"
                placeholder="password"
                type="password"
                required
                name="password"
              />
            </Stack>

            <Center className="mt-10">
              <Button type="submit" loading={isLoading}>
                Sign in
              </Button>
            </Center>
          </form>
        </Card>
      </FormProvider>
    </>
  );
};

Index.getLayout = (page) => {
  return <PublicLayout>{page}</PublicLayout>;
};

//eslint-disable-next-line
export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Index;
