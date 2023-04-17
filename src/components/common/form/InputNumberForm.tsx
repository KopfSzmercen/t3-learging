import { NumberInput, type NumberInputProps } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";

type TInputNumberFormProps = {
  name: string;
} & Omit<NumberInputProps, "icon">;

const InputNumberForm = ({ ...props }: TInputNumberFormProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field: { ref, ...field }, fieldState }) => {
        const { error } = fieldState;
        return (
          <NumberInput
            {...field}
            {...props}
            ref={ref}
            error={error?.message}
            value={field?.value as number}
          />
        );
      }}
    />
  );
};

export default InputNumberForm;
