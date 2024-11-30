import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { PATH } from "../types/path";
import { userService } from "../user/user.service";
import { UserProvider } from "../user/context";
import { SideMenu } from "./side-menu/side-menu";

interface CommonLayoutProps {
  Header: React.ReactElement;
}

export const CommonLayout: React.FC<
  PropsWithChildren<CommonLayoutProps>
> = async ({ children, Header }) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect(PATH.signIn());
  }

  const userInfo = await userService.getUser(accessToken);

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
