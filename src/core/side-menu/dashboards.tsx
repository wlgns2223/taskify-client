"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { queryOptions } from "../../libs/dashboard/query-options";
import {
  ReadDashboardsDtoSchema,
  ReadDashboardsResponse,
} from "../../libs/dashboard/dto/readDashboards.dto";
import { defaultReadDashboardsDto } from "../../components/my-dashboard/dashboards";
import { JhButton } from "../ui/jh-button";
import { useSideMenu } from "./useSideMenu";

export const SideDashboards: React.FC = () => {
  const { data: dashboards, fetchNextPage } = useSideMenu();

  return (
    <>
      <JhButton onClick={() => fetchNextPage()}>{"페치"}</JhButton>
      <ul className="mt-3 h-full overflow-scroll">
        {dashboards.map((dashboard, index) => (
          <Link
            href={`/dashboard/`}
            className="flex justify-center items-center border border-neutral-200 bg-white w-full max-w-[330px] h-[70px] px-4 py-5 rounded-md "
            key={index}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <div style={{}} className="rounded-full w-2 h-2" />
                <p className="ml-4">{dashboard.title}</p>
              </div>
              <p>{">"}</p>
            </div>
          </Link>
        ))}
      </ul>
      <div />
    </>
  );
};
