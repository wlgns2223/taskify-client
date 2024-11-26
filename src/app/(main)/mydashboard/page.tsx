import { EmptyBoard } from "../../../components/my-dashboard/empty-board";
import { Suspense } from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { queryOptions } from "../../../libs/dashboard/query-options";
import { DashboardPannel } from "../../../components/my-dashboard/dashboard-pannel";
import {
  Dashboards,
  defaultReadDashboardsDto,
} from "../../../components/my-dashboard/dashboards";

import { cookies } from "next/headers";
import { ReadDashboardsResponse } from "../../../libs/dashboard/dto/readDashboards.dto";
import { END_POINT } from "../../../core/network/end-point";

export default async () => {
  const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: queryOptions.readDashboards(defaultReadDashboardsDto).queryKey,
  //   queryFn: async () => {
  //     const allCookieArr = cookies().getAll();
  //     const allCookies = allCookieArr
  //       .map((cookie) => `${cookie.name}=${cookie.value}`)
  //       .join("; ");
  //     const headers = new Headers();
  //     headers.set("Content-Type", "application/json");
  //     headers.set("Cookie", allCookies);

  //     const res = await serverApiHandler.get<ReadDashboardsResponse>(
  //       END_POINT.dashboard.read(),
  //       { headers }
  //     );

  //     return res.data;
  //   },
  // });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardPannel>
        <Suspense
          fallback={<div className="min-h-[152px] mt-3">{"...loading"}</div>}
        >
          <Dashboards />
        </Suspense>
        <EmptyBoard />
      </DashboardPannel>
    </HydrationBoundary>
  );
};
