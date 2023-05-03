import { Textarea, type TextareaProps } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";

type TInputTextareaFormProps = {
  name: string;
} & Omit<TextareaProps, "icon">;

const InputTextareaForm = ({ ...props }: TInputTextareaFormProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field: { ref, ...field }, fieldState }) => {
        const { error } = fieldState;
        return (
          <Textarea
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

export default InputTextareaForm;
