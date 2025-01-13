import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { NextPage } from "next";
import { queryOptions } from "../../../../libs/dashboard/query-options";
import Detail from "../../../../components/dashboard/detail";
import { Suspense } from "react";
import { ReadColumnDto } from "../../../../libs/dashboard/column/dto/columns.dto";
import { todoQueryOptions } from "../../../../libs/dashboard/todo/todo-query-option";

type PageProps = {
  params: {
    id: string;
  };
};

const Dashboard: NextPage<PageProps> = async ({ params }) => {
  const dashboardId = params.id;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    ...queryOptions.getColumnsBydashboardId(dashboardId),
  });

  const data = queryClient.getQueriesData<ReadColumnDto[]>({
    queryKey: queryOptions.getColumnsBydashboardId(dashboardId).queryKey,
  });
  const columnsId = data[0][1]?.map((column) => column.id);
  if (columnsId) {
    const todoQueries = columnsId.map((columnId) =>
      queryClient.prefetchQuery({
        ...todoQueryOptions.getTodosByColumnId(columnId.toString()),
      })
    );

    await Promise.all(todoQueries);
  }

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
