import { Center } from "@mantine/core";
import { type Maybe } from "@trpc/server";
import { type DefaultErrorData } from "@trpc/server/dist/error/formatter";

const ApiError = ({
  errorData,
  message,
}: {
  errorData: Maybe<DefaultErrorData>;
  message: string | undefined;
}) => {
  return (
    <Center className="text-md rounded-md bg-red-600 p-3 font-bold text-white">
      <p>
        {errorData?.httpStatus} {message}{" "}
        {!message &&
          errorData?.httpStatus === 500 &&
          "Unexpected error, please try later."}
      </p>
    </Center>
  );
};

export default ApiError;
