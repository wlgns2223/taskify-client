import clsx from "clsx";
import { HTMLProps, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { match } from "ts-pattern";
import { Loader } from "./jh-loader";

export interface JhButtonProps
  extends Omit<HTMLProps<HTMLButtonElement>, "type"> {
  type?: "button" | "submit";
  variants?: "normal" | "reset" | "outline";
  loading?: boolean;
}

export const JhButton: React.FC<PropsWithChildren<JhButtonProps>> = ({
  children,
  type = "button",
  variants = "normal",
  loading = false,
  ...props
}) => {
  const classes =
    variants === "reset"
      ? props.className
      : twMerge(
          clsx(
            "py-2 px-4 text-neutral-50 rounded-lg cursor-pointer",
            {
              "bg-primary": variants === "normal",
              "text-neutral-700 border border-primary": variants === "outline",
            },
            {
              "bg-neutral-400 text-neutral-200": props.disabled || !!loading,
            },

            props.className
          )
        );

  return (
    <button
      type={type}
      {...props}
      className={classes}
      disabled={props.disabled || !!loading}
    >
      {match(loading)
        .with(true, () => (
          <div className="flex items-center  justify-center ">
            <Loader className="text-white" />
            <span className="ml-2">{"로딩중..."}</span>
          </div>
        ))
        .otherwise(() => children)}
    </button>
  );
};
