"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { useModal } from "../../core/hooks/useModal";
import { JhButton } from "../../core/ui/jh-button";
import { DashboardCreateModal } from "./dashboard-create-modal";
import { useState } from "react";
import { ReadDashboardsDtoSchema } from "../../libs/dashboard/dto/readDashboards.dto";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../core/ui/query-keys/dashboards.key";
import { readDashboards } from "../../libs/dashboard/create-dashboard";

export const CurrentDashboards: React.FC = () => {
  const modalHookProps = useModal();
  const [readDashboardsDto, setReadDashboardsDto] =
    useState<ReadDashboardsDtoSchema>({
      cursor: "0",
      limit: 5,
      direction: "next",
    });

  const { data } = useQuery({
    queryKey: queryKeys.all,
    queryFn: () => readDashboards(readDashboardsDto),
  });

  console.log({ data });

  return (
    <>
      <JhButton
        className="flex justify-center items-center border-neutral-200 bg-white w-full max-w-[330px] h-[70px]"
        variants="outline"
        onClick={() => modalHookProps.setIsOpen(true)}
      >
        <p>{"새로운 대시보드"}</p>
        <PlusIcon className="w-4 h-4 text-primary bg-primary-light rounded-sm ml-3" />
      </JhButton>
      <DashboardCreateModal modalHookProps={modalHookProps} />
    </>
  );
};
