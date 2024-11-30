import { PropsWithChildren } from "react";
import { CommonLayout } from "../../../core/common/common-layout";
import { BaseHeader } from "../../../core/common/header/base-header";

export default ({ children }: PropsWithChildren) => (
  <CommonLayout Header={<BaseHeader children={"내 대시보드"} />}>
    {children}
  </CommonLayout>
);
