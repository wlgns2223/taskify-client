import { match } from "ts-pattern";
import {
  Dashboard,
  ReadDashboardsDtoSchema,
} from "../../libs/dashboard/dto/readDashboards.dto";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "../../libs/dashboard/query-options";
import { DashboardPagesNumber, PAGE_SIZE } from "./dashboard-pages-number";
import { useState } from "react";
import { useUserContext } from "../../core/user/context";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface DashboardsProps {}

export const defaultReadDashboardsDto: ReadDashboardsDtoSchema = {
  cursor: null,
  limit: PAGE_SIZE.others,
  direction: "next",
};

export const Dashboards: React.FC<DashboardsProps> = ({}) => {
  const [readDashboardsDto, setReadDashboardsDto] =
    useState<ReadDashboardsDtoSchema>(defaultReadDashboardsDto);

  const { data } = useSuspenseQuery({
    ...queryOptions.readDashboards(readDashboardsDto),
  });
  const { userInfo } = useUserContext();

  return (
    <>
      {match([data, readDashboardsDto.cursor]).otherwise(([data, _]) => (
        <ul className="grid grid-cols-3 grid-rows-2 gap-3 mt-3">
          {data!.dashboards.map((dashboard: Dashboard) => (
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
      ))}
      <DashboardPagesNumber
        readDashboardResponse={data}
        setReadDashboardsDto={setReadDashboardsDto}
        readDashboardsDto={readDashboardsDto}
      />
    </>
  );
};
