import Link from "next/link";
import { cookies } from "next/headers";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { PATH } from "../../types/path";
import { userService } from "../../user/user.service";
import UserIcon from "./user-icon";
import { memberService } from "../../../libs/member/member.service";
import { Dashboard } from "../../../libs/dashboard/dto/readDashboards.dto";
import { MemberSchemaDto } from "../../../libs/member/dto/member.dto";

interface DashboardHeaderProps {
  id: string;
  dashboard?: Dashboard;
  members?: MemberSchemaDto[];
}

export const DashboardHeader: React.FC<
  PropsWithChildren<DashboardHeaderProps>
> = async ({ children, dashboard, members }) => {
  if (!dashboard)
    return (
      <header className="w-full flex items-center h-[70px] px-10 py-4 border border-x-0 border-t-0  border-b-neutral-200">
        {"대시보드 정보를 불러 올 수 없습니다."}
      </header>
    );

  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect(PATH.signIn());
  }

  const userInfo = await userService.getUser(accessToken);
  const membersToshow = members ? members.slice(0, 4) : [];
  const restMembers = members ? members.slice(4) : [];

  return (
    <header className="w-full  flex items-center h-[70px] px-3 py-2 md:px-10 md:py-4 border border-x-0 border-t-0  border-b-neutral-200 text-sm md:text-base">
      <div className="flex items-center justify-between w-full h-full">
        <span className="hidden md:block whitespace-nowrap">
          {dashboard.title}
        </span>
        <nav className="flex items-center h-full w-full ">
          <div className="flex items-center justify-between md:justify-end w-full">
            <div className="flex space-x-2">
              <Link
                href={`/dashboard/${dashboard.id}/edit`}
                className="flex items-center px-4 py-1 border border-neutral-200 rounded-lg"
              >
                <Cog6ToothIcon className="w-5 h-5 hidden sm:block" />
                <span className="text-nowrap sm:ml-2 text-neutral-700">
                  {"관리"}
                </span>
              </Link>
              {children}
            </div>
            <div className="sm:ml-10">
              <ul className="flex items-center -space-x-3">
                {membersToshow.map((member, idx) => (
                  <li
                    key={member.id}
                    className="rounded-full w-8 h-8  md:w-9 md:h-9 flex items-center justify-center  bg-red-400 border-[3px] border-neutral-50 "
                  >
                    {idx}
                  </li>
                ))}
                {restMembers.length > 0 && (
                  <li className="rounded-full w-8 h-8 md:w-9 md:h-9 flex items-center justify-center  bg-red-400 border-[3px] border-neutral-50 ">
                    {"+" + restMembers.length}
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="h-full flex">
            <div className="h-full">
              <div className="w-[2px] h-full bg-neutral-200 mx-2 sm:mx-4 md:mx-8" />
            </div>
            <UserIcon userInfo={userInfo} />
          </div>
        </nav>
      </div>
    </header>
  );
};
