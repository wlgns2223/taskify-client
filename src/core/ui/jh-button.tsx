import clsx from "clsx";
import { HTMLProps, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export interface JhButtonProps
  extends Omit<HTMLProps<HTMLButtonElement>, "type"> {
  type?: "button" | "submit";
  variants?: "normal" | "reset" | "outline";
}

export const JhButton: React.FC<PropsWithChildren<JhButtonProps>> = ({
  children,
  type = "button",
  variants = "normal",
  ...props
}) => {
  const classes = twMerge(
    clsx(
      "py-3 px-4 text-neutral-50 rounded-lg cursor-pointer",
      {
        "bg-primary": variants === "normal",
        "text-neutral-700 border border-primary": variants === "outline",
      },
      {
        "bg-neutral-400": props.disabled,
      },
      props.className
    )
  );

  return (
    <button type={type} {...props} className={classes}>
      {children}
    </button>
  );
};
