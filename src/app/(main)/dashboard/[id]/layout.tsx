import { PropsWithChildren, Suspense } from "react";
import { CommonLayout } from "../../../../core/common/common-layout";
import { DashboardHeader } from "../../../../core/common/header/dashboard-header";
import { InvitationHeaderButton } from "../../../../components/dashboard/invitation-header-button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PATH } from "../../../../core/types/path";
import { userService } from "../../../../core/user/user.service";
import { dashboardService } from "../../../../libs/dashboard/dashboard.service";
import { DashboardProvider } from "../../../../core/providers/dashboard-provider";
import { memberService } from "../../../../libs/member/member.service";

export default async ({
  children,
  params,
}: PropsWithChildren<{
  params: { id: string };
}>) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect(PATH.signIn());
  }

  const userInfo = await userService.getUser(accessToken);
  const dashboard = await dashboardService.findById(params.id);
  const members = await memberService.getMembersByDashboardId(dashboard.id);
  return (
    <DashboardProvider dashboard={dashboard} dashboardMembers={members}>
      <CommonLayout
        userInfo={userInfo}
        Header={
          <Suspense fallback={<div>{"...loading"}</div>}>
            <DashboardHeader
              id={params.id}
              dashboard={dashboard}
              members={members}
            >
              <InvitationHeaderButton />
            </DashboardHeader>
          </Suspense>
        }
      >
        {children}
      </CommonLayout>
    </DashboardProvider>
  );
};
