import { PropsWithChildren } from "react";
import { CommonLayout } from "../../../core/common/common-layout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PATH } from "../../../core/types/path";
import { userService } from "../../../core/user/user.service";
import { BasicHeader } from "../../../core/common/header/basic-header";

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
      Header={<BasicHeader headerText="내 대시보드" userInfo={userInfo} />}
    >
      {children}
    </CommonLayout>
  );
};
