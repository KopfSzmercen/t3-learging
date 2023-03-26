import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Center, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import InputTextForm from "~/components/common/form/InputTextForm";
import { type NextPageWithLayout } from "~/components/common/layouts/NextPageWithLayout";
import PublicLayout from "~/components/common/layouts/PublicLayout";
import { api } from "~/utils/api";

const SignUpFormSchema = z
  .object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
    confirmPassword: z.string().nonempty(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });
type TSignUpFormSchema = z.infer<typeof SignUpFormSchema>;

const SignUpPage: NextPageWithLayout = () => {
  const router = useRouter();

  const signUpMutation = api.auth.signUp.signUp.useMutation({
    onSuccess: async () => {
      notifications.show({
        title: "Success!",
        message: "Registered successfully!",
      });

      await router.push("/auth/sign-in");
    },
    onError: (error) => {
      console.log(error);
      notifications.show({
        title: "Error!",
        message: error.message ?? "Sorry, there was an error.",
      });
    },
  });

  const methods = useForm<TSignUpFormSchema>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const onSubmit: SubmitHandler<TSignUpFormSchema> = (data) => {
    signUpMutation.mutate(data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <Card className="mx-auto w-full max-w-2xl p-6">
          <Center>
            <h1>Register</h1>
          </Center>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
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

              <InputTextForm
                label="Confrirm Password"
                placeholder="password"
                type="password"
                required
                name="confirmPassword"
              />
            </Stack>

            <Center className="mt-10">
              <Button type="submit" loading={signUpMutation.isLoading}>
                Register
              </Button>
            </Center>
          </form>
        </Card>
      </FormProvider>
    </>
  );
};

export default SignUpPage;

SignUpPage.getLayout = (page) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}
