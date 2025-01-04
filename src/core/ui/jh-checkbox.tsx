import { Checkbox, CheckboxProps, Field, Label } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface JhCheckboxProps extends CheckboxProps {
  containerClassName?: string;
  labelClassName?: string;
}

export const JhCheckbox: React.FC<PropsWithChildren<JhCheckboxProps>> = ({
  checked,
  onChange,
  labelClassName,
  containerClassName,
  children,
}) => {
  const containerClasses = twMerge(
    clsx("flex items-center", containerClassName)
  );
  const labelClasses = twMerge(clsx("ml-2 cursor-pointer blu", labelClassName));
  return (
    <Field className={containerClasses}>
      <Checkbox
        checked={checked}
        onChange={onChange}
        className={
          "group flex items-center justify-center size-5  border rounded-md cursor-pointer"
        }
      >
        <CheckIcon className="hidden group-data-[checked]:block size-5" />
      </Checkbox>
      <Label className={labelClasses}>{children}</Label>
    </Field>
  );
};
