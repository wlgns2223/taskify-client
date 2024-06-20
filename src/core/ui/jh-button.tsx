import clsx from "clsx";
import { HTMLProps, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface JhButtonProps extends Omit<HTMLProps<HTMLButtonElement>, "type"> {
  type?: "button" | "submit" | "reset";
}

export const JhButton: React.FC<PropsWithChildren<JhButtonProps>> = ({
  children,
  type = "button",
  ...props
}) => {
  const classes = twMerge(
    clsx(
      "py-3 px-4 bg-primary text-neutral-50 rounded-lg cursor-pointer",
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
