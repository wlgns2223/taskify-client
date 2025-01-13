import clsx from "clsx";
import { HTMLProps, InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface JHInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "normal" | "reset";
}

export const JHInput = forwardRef<HTMLInputElement, JHInputProps>(
  ({ className, variant = "normal", ...props }, ref) => {
    const classes =
      variant === "reset"
        ? className
        : twMerge(
            clsx(
              "border border-neutral-300 rounded-lg px-4 py-2 w-full focus:border-primary focus:outline-none h-12",
              className
            )
          );

    return <input ref={ref} {...props} className={classes} />;
  }
);
