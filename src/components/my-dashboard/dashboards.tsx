"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "../../libs/dashboard/query-options";
import { PaginationButtons } from "./dashboard-pages-number";
import { useState } from "react";
import { useUserContext } from "../../core/user/context";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  DEFAULT_PAGE_SIZE,
  OffsetPaginationRequestDto,
} from "../../libs/dashboard/dto/offsetPagination.dto";
import { Dashboard } from "../../libs/dashboard/dto/readDashboards.dto";

interface DashboardsProps {}

export const defaultOffsetPaginationReqDto: OffsetPaginationRequestDto = {
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
};

export const Dashboards: React.FC<DashboardsProps> = ({}) => {
  const [offsetPaginationReqDto, setOffsetPaginationReqDto] =
    useState<OffsetPaginationRequestDto>(defaultOffsetPaginationReqDto);

  const { data: offsetPaginationResponse } = useSuspenseQuery({
    ...queryOptions.readDashboards(offsetPaginationReqDto),
  });

  const { userInfo } = useUserContext();
  const { data: dashboards } = offsetPaginationResponse;

  return (
    <div>
      <ul className="grid grid-cols-3 grid-rows-2 gap-3 mt-3">
        {dashboards.map((dashboard: Dashboard) => (
          <li key={dashboard.id}>
            <Link
              href={`/dashboard/${dashboard.id}`}
              className="flex justify-center items-center border border-neutral-200 bg-white w-full max-w-[330px] h-[70px] px-4 py-5 rounded-md "
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <div
                    style={{
                      backgroundColor: dashboard.color,
                    }}
                    className="rounded-full w-2 h-2"
                  />
                  <p className="ml-4">{dashboard.title}</p>
                  {dashboard.ownerId === userInfo.id && (
                    <CheckBadgeIcon className="text-blue-400 w-5 h-5 ml-2" />
                  )}
                </div>
                <p>{">"}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <PaginationButtons
        offsetPaginationReqDto={offsetPaginationReqDto}
        setOffsetPaginationReqDto={setOffsetPaginationReqDto}
        offsetPaginationResponse={offsetPaginationResponse}
      />
    </div>
  );
};
