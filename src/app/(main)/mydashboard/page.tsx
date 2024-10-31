import { EmptyBoard } from "../../../components/my-dashboard/empty-board";
import { PropsWithChildren, Suspense } from "react";
import { CurrentDashboards } from "../../../components/my-dashboard/current-dashboards";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { queryOptions } from "../../../libs/dashboard/query-options";

const MyDashBoard: React.FC<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};
export default async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    ...queryOptions.readDashboards({
      cursor: null,
      limit: 6,
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
