import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { NextPage } from "next";
import Detail from "../../../../components/dashboard/detail";
import { Suspense } from "react";
import { ReadColumnDto } from "../../../../libs/dashboard/column/dto/columns.dto";
import { todoQueryOptions } from "../../../../libs/dashboard/todo/services/query-key";
import { columnQueryOptions } from "../../../../libs/dashboard/column/services/query-key";

type PageProps = {
  params: {
    id: string;
  };
};

const Dashboard: NextPage<PageProps> = async ({ params }) => {
  const dashboardId = parseInt(params.id, 10);

  const queryClient = new QueryClient();

  // Prefetch columns
  await queryClient.prefetchQuery({
    ...columnQueryOptions.findBy(dashboardId),
  });

  // Prefetch todos
  const prefetchedColumns =
    queryClient.getQueriesData<ReadColumnDto[]>({
      queryKey: columnQueryOptions.findBy(dashboardId).queryKey,
    })[0][1] ?? [];

  const columnIds = prefetchedColumns.map((column) => column.id);
  const prefetchTodos = columnIds.map((columnId) =>
    queryClient.prefetchQuery({
      ...todoQueryOptions.findManyBy(columnId),
    })
  );
  await Promise.all(prefetchTodos);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={<div className="min-h-[152px] mt-3">{"...loading"}</div>}
      >
        <Detail dashboardId={dashboardId} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Dashboard;
