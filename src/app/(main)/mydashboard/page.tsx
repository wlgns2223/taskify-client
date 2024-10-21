import { EmptyBoard } from "../../../components/my-dashboard/empty-board";
import { PropsWithChildren } from "react";
import { CurrentDashboards } from "../../../components/my-dashboard/dashboard-create";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  hydrate,
} from "@tanstack/react-query";
import { queryKeys } from "../../../core/ui/query-keys/dashboards.key";
import { readDashboards } from "../../../libs/dashboard/create-dashboard";

const MyDashBoard: React.FC<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};
export default async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.all,
    queryFn: () =>
      readDashboards({
        cursor: "0",
        limit: 5,
        direction: "next",
      }),
  });

  return (
    <MyDashBoard>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CurrentDashboards />
      </HydrationBoundary>
      <EmptyBoard />
    </MyDashBoard>
  );
};
