import { PropsWithChildren, Suspense } from "react";
import { CommonLayout } from "../../../../core/common/common-layout";
import { DashboardHeader } from "../../../../core/common/header/dashboard-header";
import { InvitationHeaderButton } from "../../../../components/dashboard/invitation-header-button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PATH } from "../../../../core/types/path";
import { userService } from "../../../../core/user/user.service";

export default async ({ children }: PropsWithChildren) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect(PATH.signIn());
  }

  const userInfo = await userService.getUser(accessToken);
  return (
    <CommonLayout
      userInfo={userInfo}
      Header={
        <Suspense fallback={<div>{"...loading"}</div>}>
          <DashboardHeader>
            <InvitationHeaderButton />
          </DashboardHeader>
        </Suspense>
      }
    >
      {children}
    </CommonLayout>
  );
};
