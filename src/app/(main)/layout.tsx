import { cookies } from "next/headers";
import { PropsWithChildren } from "react";
import { PATH } from "../../core/path";
import { redirect } from "next/navigation";
import { userService } from "../../core/user/user.service";
import { UserProvider } from "../../core/user/context";
import { SideMenu } from "../../core/side-menu/side-menu";

const Layout: React.FC<PropsWithChildren> = async ({ children }) => {
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
        <main className="flex-1 flex flex-col">
          <header className="w-full flex items-center h-[70px] px-10 py-4 border border-x-0 border-t-0  border-b-neutral-200">
            {"header"}
          </header>
          <div className="bg-neutral-100 p-10 flex-1">{children}</div>
        </main>
        <div id="modal_portal" />
      </div>
    </UserProvider>
  );
};

export default Layout;
