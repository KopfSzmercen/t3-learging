import { Button, Text, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import { BiLogIn } from "react-icons/bi";

const Hero = () => {
  const theme = useMantineTheme();
  return (
    <div>
      <div className="max-w-[900px] text-center leading-8">
        <Text
          variant="gradient"
          gradient={{
            from: theme.primaryColor,
            to: "teal",
            deg: 60,
          }}
          ta="center"
          fz="xl"
          className="font-s"
          fw={900}
        >
          <h1 className="font-extrabold">
            Gradebook Lorem ipsum dolor amet sit.
          </h1>
        </Text>

        <p>
          <span className="font-bold ">Lorem, ipsum. </span>Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Eum accusamus omnis officiis
          vel aspernatur quia consectetur aliquid cum. Odio, ratione!
        </p>
      </div>

      <div className="mx-auto mt-12 flex max-w-[190px] justify-between">
        <Link href="/auth/sign-in">
          <Button rightIcon={<BiLogIn />}>Log in</Button>
        </Link>

        <Link href="/auth/sign-up">
          <Button variant="outline">Sign up</Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
