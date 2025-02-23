import { useSuspenseQuery } from "@tanstack/react-query";
import { columnQueryOptions } from "../services/query-key";
import { useCreateColumnMutation } from "./useCreateColumnMutation";
import { useSwapColumnMutation } from "./useSwapColumnMutation";

export const useColumns = (dashboardId: number) => {
  const { data: columns } = useSuspenseQuery({
    ...columnQueryOptions.findBy(dashboardId),
  });

  const createColumnMutation = useCreateColumnMutation({ dashboardId });

  const swapColumnsMutation = useSwapColumnMutation({ dashboardId });

  return {
    columns,
    swapColumnsMutation,
    createColumnMutation,
  };
};
