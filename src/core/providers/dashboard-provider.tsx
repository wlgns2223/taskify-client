"use client";

import { PropsWithChildren, createContext, useContext } from "react";
import { Dashboard } from "../../libs/dashboard/dto/readDashboards.dto";
import { MemberSchemaDto } from "../../libs/member/dto/member.dto";

const DashboardContext = createContext({
  dashboard: {} as Dashboard,
  dashboardMembers: [] as MemberSchemaDto[],
});

export const useDashboardContext = () => useContext(DashboardContext);

interface DashboardProviderProps {
  dashboard: Dashboard;
  dashboardMembers: MemberSchemaDto[];
}

export const DashboardProvider: React.FC<
  PropsWithChildren<DashboardProviderProps>
> = ({ children, dashboard, dashboardMembers }) => {
  return (
    <DashboardContext.Provider value={{ dashboard, dashboardMembers }}>
      {children}
    </DashboardContext.Provider>
  );
};
