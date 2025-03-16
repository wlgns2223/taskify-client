import { PropsWithChildren, Suspense } from "react";
import { Loader } from "./jh-loader";
import { twMerge } from "tailwind-merge";

interface JHSuspenseProps {
  className?: string;
}

export const JHSuspense: React.FC<PropsWithChildren<JHSuspenseProps>> = ({
  children,
  className,
}) => {
  const classes = twMerge("flex justify-center", className);
  return (
    <Suspense
      fallback={
        <div className={classes}>
          <Loader />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};
