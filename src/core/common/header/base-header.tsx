import { PropsWithChildren } from "react";

export const BaseHeader: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <header className="w-full flex items-center h-[70px] px-10 py-4 border border-x-0 border-t-0  border-b-neutral-200">
      {children}
    </header>
  );
};
{
}
