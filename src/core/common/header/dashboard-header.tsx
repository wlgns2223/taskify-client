import Link from "next/link";
import { dashboardService } from "../../../libs/dashboard/dashboard.service";
import { cookies, headers } from "next/headers";
import { NEXT_FULL_URL_HEADER } from "../../../middleware";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { PATH } from "../../types/path";
import { userService } from "../../user/user.service";
import { DashboardProvider } from "../../providers/dashboard-provider";
import UserIcon from "./user-icon";

export const DashboardHeader: React.FC<PropsWithChildren> = async ({
  children,
}) => {
  const fullUrl =
    headers().get(NEXT_FULL_URL_HEADER) ?? headers().get("referer");

  const url = new URL(fullUrl ?? "");
  const paths = url.pathname.split("/");
  const id = paths.at(-1);
  if (!id)
    return (
      <header className="w-full flex items-center h-[70px] px-10 py-4 border border-x-0 border-t-0  border-b-neutral-200">
        {"대시보드 정보를 불러 올 수 없습니다."}
      </header>
    );

  const dashboard = await dashboardService.getDashboardById(id);

  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect(PATH.signIn());
  }

  const userInfo = await userService.getUser(accessToken);

  const allMembers = Array.from({ length: 2 });
  const members = allMembers.slice(0, 4);
  const restMembers = allMembers.slice(4);

  return (
    <DashboardProvider dashboard={dashboard}>
      <header className="w-full  flex items-center h-[70px] px-10 py-4 border border-x-0 border-t-0  border-b-neutral-200">
        <div className="flex items-center justify-between w-full h-full">
          <span>{dashboard.title}</span>
          <nav className="h-full">
            <ul className="flex items-center h-full">
              <li>
                <Link
                  href={`/dashboard/${dashboard.id}/edit`}
                  as={"div"}
                  className="flex items-center px-4 py-2 border border-neutral-200 rounded-lg"
                >
                  <Cog6ToothIcon className="w-5 h-5" />
                  <span className="text-nowrap ml-2 text-neutral-700">
                    {"관리"}
                  </span>
                </Link>
              </li>
              <li className="ml-4">{children}</li>
              <li className="ml-10">
                <ul className="flex items-center pl-3">
                  {members.map((_, idx) => (
                    <li className="rounded-full w-9 h-9 flex items-center justify-center -ml-3 bg-red-400 border-[3px] border-neutral-50 ">
                      {idx}
                    </li>
                  ))}
                  {restMembers.length > 0 && (
                    <li className="rounded-full w-9 h-9 flex items-center justify-center -ml-3 bg-red-400 border-[3px] border-neutral-50 ">
                      {"+" + restMembers.length}
                    </li>
                  )}
                </ul>
              </li>
              <li className="h-full">
                <div className="w-[2px] h-full bg-neutral-200 mx-8" />
              </li>
              <li>
                <UserIcon userInfo={userInfo} />
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </DashboardProvider>
  );
};
