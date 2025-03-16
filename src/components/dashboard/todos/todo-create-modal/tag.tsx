import { PropsWithChildren } from "react";

export const Tag: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <span className="flex justify-center items-center px-4 py-1 bg-primary-light rounded-lg text-sm  ">
      {children}
    </span>
  );
};
