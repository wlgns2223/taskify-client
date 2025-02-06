import { Suspense, useMemo } from "react";
import {
  FetchQueryOptions,
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { DashboardPannel } from "../../../components/my-dashboard/dashboard-pannel";
import { Dashboards } from "../../../components/my-dashboard/dashboards";
import { InvitationList } from "../../../components/my-dashboard/invitation-list";
import { defaultOffsetPaginationReqDto } from "../../../core/const/default-pagination";
import { myDashboardQueryOptions } from "../../../libs/my-dashboard/services/query-key";
import { invitationQueryOptions } from "../../../libs/my-dashboard/invitation/services/query-key";

export default async () => {
  const queryClient = new QueryClient();

  const queryOptions: FetchQueryOptions[] = useMemo(
    () => [
      {
        queryKey: myDashboardQueryOptions.findByPagination(
          defaultOffsetPaginationReqDto
        ).queryKey,
        queryFn: myDashboardQueryOptions.findByPagination(
          defaultOffsetPaginationReqDto
        ).queryFn,
      },
      {
        queryKey: invitationQueryOptions.findByPagination(
          defaultOffsetPaginationReqDto
        ).queryKey,
        queryFn: invitationQueryOptions.findByPagination(
          defaultOffsetPaginationReqDto
        ).queryFn,
      },
    ],
    []
  );

  const queries = queryOptions.map((option) =>
    queryClient.prefetchQuery(option)
  );

  await Promise.all(queries);

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
