import React from "react";
import { DatePickerInput, type DatePickerInputProps } from "@mantine/dates";
import { Controller, useFormContext } from "react-hook-form";

type TInputDateFormProps = {
  name: string;
} & DatePickerInputProps;

const InputDateForm = ({ ...props }: TInputDateFormProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field: { ref, ...field }, fieldState }) => {
        const { error } = fieldState;
        return (
          <DatePickerInput
            {...field}
            {...props}
            ref={ref}
            error={error?.message}
            value={(field?.value as Date) ?? new Date()}
          />
        );
      }}
    />
  );
};

export default InputDateForm;
