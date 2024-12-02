import { PropsWithChildren } from "react";
import { UserProvider } from "../user/context";
import { SideMenu } from "./side-menu/side-menu";
import { User } from "../user/type";

interface CommonLayoutProps {
  Header: React.ReactElement;
  userInfo: User;
}

export const CommonLayout: React.FC<
  PropsWithChildren<CommonLayoutProps>
> = async ({ children, Header, userInfo }) => {
  return (
    <UserProvider userInfo={userInfo}>
      <div className="flex min-w-96">
        <SideMenu />
        <main className="flex-1 flex flex-col overflow-hidden">
          {Header}
          <div className="bg-neutral-100 p-4 flex-1">{children}</div>
        </main>
        <div id="modal_portal" />
      </div>
    </UserProvider>
  );
};
