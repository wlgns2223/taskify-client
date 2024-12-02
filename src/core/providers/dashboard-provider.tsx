"use client";

import { PropsWithChildren, createContext, useContext } from "react";
import { Dashboard } from "../../libs/dashboard/dto/readDashboards.dto";

const DashboardContext = createContext({
  dashboard: {} as Dashboard,
});

export const useDashboardContext = () => useContext(DashboardContext);

interface DashboardProviderProps {
  dashboard: Dashboard;
}

export const DashboardProvider: React.FC<
  PropsWithChildren<DashboardProviderProps>
> = ({ children, dashboard }) => {
  return (
    <DashboardContext.Provider value={{ dashboard }}>
      {children}
    </DashboardContext.Provider>
  );
};
