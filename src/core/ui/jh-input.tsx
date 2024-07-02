import clsx from "clsx";
import { HTMLProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface JHInputProps extends HTMLProps<HTMLInputElement> {}

export const JHInput: React.FC<JHInputProps> = ({ className, ...props }) => {
  const classes = twMerge(
    clsx("border border-neutral-300 rounded-lg p-4 w-full", className)
  );

  return <input className={classes} {...props} />;
};
