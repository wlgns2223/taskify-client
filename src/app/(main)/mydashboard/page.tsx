import { EmptyBoard } from "../../../components/my-dashboard/empty-board";
import { Suspense } from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { queryOptions } from "../../../libs/dashboard/query-options";
import { DashboardPannel } from "../../../components/my-dashboard/dashboard-pannel";
import { Dashboards } from "../../../components/my-dashboard/dashboards";

import { cookies } from "next/headers";
import { ReadDashboardsResponse } from "../../../libs/dashboard/dto/readDashboards.dto";
import { END_POINT } from "../../../core/network/end-point";
import { InvitationList } from "../../../components/my-dashboard/invitation-list";
import { apiHandler } from "../../../core/network/fetch";
import { defaultOffsetPaginationReqDto } from "../../../core/const/default-pagination";

export default async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryOptions.readDashboards(defaultOffsetPaginationReqDto)
      .queryKey,
    queryFn: async () => {
      const allCookieArr = cookies().getAll();
      const allCookies = allCookieArr
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; ");
      const headers = new Headers();
      headers.set("Cookie", allCookies);

      const res = await apiHandler.get<ReadDashboardsResponse>(
        END_POINT.dashboard.read(defaultOffsetPaginationReqDto),
        { headers }
      );

      return res.data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: queryOptions.getInvitationsWithPagination(
      defaultOffsetPaginationReqDto
    ).queryKey,
    queryFn: async () => {
      const allCookieArr = cookies().getAll();
      const allCookies = allCookieArr
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; ");
      const headers = new Headers();
      headers.set("Cookie", allCookies);

      const res = await apiHandler.get<ReadDashboardsResponse>(
        END_POINT.invitation.read(defaultOffsetPaginationReqDto),
        { headers }
      );

      return res.data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardPannel>
        <Suspense
          fallback={<div className="min-h-[152px] mt-3">{"...loading"}</div>}
        >
          <Dashboards />
        </Suspense>
        <Suspense
          fallback={<div className="min-h-[152px] mt-3">{"...loading"}</div>}
        >
          <InvitationList />
        </Suspense>
      </DashboardPannel>
    </HydrationBoundary>
  );
};
