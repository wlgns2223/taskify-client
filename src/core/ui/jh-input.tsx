import clsx from "clsx";
import { HTMLProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface JHInputProps extends HTMLProps<HTMLInputElement> {}

export const JHInput = forwardRef<HTMLInputElement, JHInputProps>(
  ({ className, ...props }, ref) => {
    const classes = twMerge(
      clsx(
        "border border-neutral-300 rounded-lg p-4 w-full focus:outline-primary",
        className
      )
    );

    return <input ref={ref} className={classes} {...props} />;
  }
);
