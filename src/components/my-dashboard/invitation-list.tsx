import { PropsWithChildren } from "react";

export const InvitationList: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex px-6 py-8 bg-neutral-50 rounded-lg mt-11">
      <p className="font-bold text-2xl">{"초대받은 대시보드"}</p>
      {children}
      <ul></ul>
    </div>
  );
};
