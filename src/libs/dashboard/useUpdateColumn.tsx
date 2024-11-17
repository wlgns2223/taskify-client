import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryOptions } from "./query-options";
import { ReadColumnDto } from "./dto/columns.dto";
import { useToast } from "../../core/hooks/useToast";

export const useUpdateColumn = () => {
  const qc = useQueryClient();
  const { notify } = useToast();
  return useMutation({
    mutationFn: queryOptions.updateColumn().queryFn,
    onMutate: async (column) => {
      await qc.cancelQueries({
        queryKey: queryOptions.getColumnsBydashboardId(
          column.dashboardId.toString()
        ).queryKey,
      });
      const previousColumns = qc.getQueryData<ReadColumnDto[]>(
        queryOptions.getColumnsBydashboardId(column.dashboardId.toString())
          .queryKey
      );
      if (previousColumns) {
        const updatedColumns = previousColumns.map((c) =>
          column.id === c.id
            ? {
                ...c,
                name: column.name,
              }
            : c
        );

        qc.setQueryData(
          queryOptions.getColumnsBydashboardId(column.dashboardId.toString())
            .queryKey,
          updatedColumns
        );
      }

      return { previousColumns };
    },
    onError: (err, variables, context) => {
      if (context?.previousColumns) {
        qc.setQueryData(
          queryOptions.getColumnsBydashboardId(variables.id.toString())
            .queryKey,
          context.previousColumns
        );
      }

      notify(err.message);
    },
    onSettled: (data, err, varialbe, context) => {
      qc.setQueryData<ReadColumnDto[]>(
        queryOptions.getColumnsBydashboardId(varialbe.id.toString()).queryKey,
        (oldData) => {
          if (!oldData) return oldData;
          return oldData.map((c) =>
            data.id === c.id
              ? {
                  ...data,
                }
              : c
          );
        }
      );
    },
  });
};
