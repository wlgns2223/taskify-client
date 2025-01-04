"use client";

import { twMerge } from "tailwind-merge";
import { JhButton, JhButtonProps } from "../../core/ui/jh-button";
import { useCreateDashboard } from "../../libs/dashboard/useCreateDashboard";
import { DashboardCreateContent } from "../my-dashboard/dashboard-create-content";
import clsx from "clsx";
import { useDashboardContext } from "../../core/providers/dashboard-provider";
import { useEffect } from "react";

interface DashboardUpdateProps {}

export const DashboardUpdate: React.FC<DashboardUpdateProps> = ({}) => {
  const { dashBoardCreateDto, setDashBoardCreateDto } = useCreateDashboard();
  const { dashboard, dashboardMembers: members } = useDashboardContext();

  useEffect(() => {
    setDashBoardCreateDto({
      title: dashboard.title,
      color: dashboard.color,
    });
  }, []);

  return (
    <div className="relative bg-white p-8 rounded-lg mt-6">
      <DashboardCreateContent
        dashboardCreateDto={dashBoardCreateDto}
        setDashBoardCreateDto={setDashBoardCreateDto}
      />
      <div className="flex justify-between sm:justify-end gap-3 mt-6">
        <JhButton
          className={twMerge(clsx("flex-1 sm:flex-none min-w-32"))}
          variants="outline"
        >
          {"취소"}
        </JhButton>
        <JhButton className={twMerge(clsx("flex-1 sm:flex-none min-w-32"))}>
          {"수정"}
        </JhButton>
      </div>
    </div>
  );
};
