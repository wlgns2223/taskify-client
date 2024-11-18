import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../core/hooks/useToast";
import { queryOptions } from "./query-options";
import { ReadColumnDto } from "./dto/columns.dto";

export const useDeleteColumn = () => {
  const qc = useQueryClient();
  const { notify } = useToast();

  return useMutation({
    mutationFn: queryOptions.deleteColumn().queryFn,
    onMutate: async (deleteColumnDto) => {
      await qc.cancelQueries({
        queryKey: queryOptions.getColumnsBydashboardId(
          deleteColumnDto.dashboardId.toString()
        ).queryKey,
      });

      const previousColumns = qc.getQueryData<ReadColumnDto[]>(
        queryOptions.getColumnsBydashboardId(
          deleteColumnDto.dashboardId.toString()
        ).queryKey
      );
      if (previousColumns) {
        const updatedColumns = previousColumns.filter(
          (c) => c.id !== deleteColumnDto.id
        );
        qc.setQueryData(
          queryOptions.getColumnsBydashboardId(
            deleteColumnDto.dashboardId.toString()
          ).queryKey,
          updatedColumns
        );
      }

      return { previousColumns };
    },
    onError: (err, variables, context) => {
      if (context?.previousColumns) {
        qc.setQueryData(
          queryOptions.getColumnsBydashboardId(variables.dashboardId.toString())
            .queryKey,
          context.previousColumns
        );
      }
      console.error(err);

      notify(err.message);
    },
    onSettled: (data, err, variables, context) => {
      qc.setQueryData<ReadColumnDto[]>(
        queryOptions.getColumnsBydashboardId(variables.dashboardId.toString())
          .queryKey,
        (oldData) => {
          if (!oldData) return oldData;
          return oldData.filter((c) => c.id !== variables.id);
        }
      );
    },
  });
};
