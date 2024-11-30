import { PropsWithChildren, Suspense } from "react";
import { CommonLayout } from "../../../../core/common/common-layout";
import { DashboardHeader } from "../../../../core/common/header/dashboard-header";
import { InvitationHeaderButton } from "../../../../components/dashboard/invitation-header-button";

export default ({ children }: PropsWithChildren) => (
  <CommonLayout
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
