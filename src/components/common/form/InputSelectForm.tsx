import { Select, type SelectProps } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";

type TInputSelectFormProps = {
  name: string;
} & SelectProps;

const InputSelectForm = ({ ...props }: TInputSelectFormProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field: { ref, ...field }, fieldState }) => {
        const { error } = fieldState;
        return (
          <Select {...field} {...props} ref={ref} error={error?.message} />
        );
      }}
    />
  );
};

export default InputSelectForm;
