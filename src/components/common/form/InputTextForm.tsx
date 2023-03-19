import { TextInput, type TextInputProps } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";

type TInputTextFormProps = {
  name: string;
} & Omit<TextInputProps, "icon">;

const InputTextForm = ({ ...props }: TInputTextFormProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field: { ref, ...field }, fieldState }) => {
        const { error } = fieldState;
        return (
          <TextInput
            {...field}
            {...props}
            ref={ref}
            error={error?.message}
            value={(field?.value as string) ?? ""}
          />
        );
      }}
    />
  );
};

export default InputTextForm;
