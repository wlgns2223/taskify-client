import Link from "next/link";
import { dashboardService } from "../../../libs/dashboard/dashboard.service";
import { cookies, headers } from "next/headers";
import { NEXT_FULL_URL_HEADER } from "../../../middleware";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { PATH } from "../../types/path";
import { userService } from "../../user/user.service";

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

  return (
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
              <div className="flex items-center pl-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div className="rounded-full w-9 h-9 flex items-center justify-center -ml-3 bg-red-400 border-[3px] border-neutral-50 ">
                    {idx}
                  </div>
                ))}
              </div>
            </li>
            <li className="h-full">
              <div className="w-[2px] h-full bg-neutral-200 mx-8" />
            </li>
            <li>
              <div className="flex items-center justify-center">
                <div className="rounded-full w-9 h-9 flex items-center justify-center bg-red-400 border-[3px] border-neutral-50">
                  {userInfo.email.split("")[0]}
                </div>
                <span className="ml-3">{userInfo.nickname}</span>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};