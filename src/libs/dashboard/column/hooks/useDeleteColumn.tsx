import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../../../core/hooks/useToast";
import { ReadColumnDto } from "../dto/columns.dto";
import { DelteColumnDto, columnService } from "../services/service";
import { columnQueryOptions } from "../services/query-key";

export const useDeleteColumn = () => {
  const qc = useQueryClient();
  const { notify } = useToast();

  return useMutation({
    mutationFn: (deleteColumnDto: DelteColumnDto) =>
      columnService.delete(
        deleteColumnDto.columnId,
        deleteColumnDto.dashboardId
      ),
    onMutate: async (deleteColumnDto) => {
      await qc.cancelQueries({
        queryKey: columnQueryOptions.findBy(deleteColumnDto.dashboardId)
          .queryKey,
      });

      const previousColumns = qc.getQueryData<ReadColumnDto[]>(
        columnQueryOptions.findBy(deleteColumnDto.dashboardId).queryKey
      );
      if (previousColumns) {
        const updatedColumns = previousColumns.filter(
          (c) => c.id !== deleteColumnDto.columnId
        );
        qc.setQueryData(
          columnQueryOptions.findBy(deleteColumnDto.dashboardId).queryKey,
          updatedColumns
        );
      }

      return { previousColumns };
    },
    onError: (err, variables, context) => {
      if (context?.previousColumns) {
        qc.setQueryData(
          columnQueryOptions.findBy(variables.dashboardId).queryKey,
          context.previousColumns
        );
      }
      console.error(err);

      notify(err.message);
    },
    onSettled: (data, err, variables, context) => {
      qc.setQueryData<ReadColumnDto[]>(
        columnQueryOptions.findBy(variables.dashboardId).queryKey,
        (oldData) => {
          if (!oldData) return oldData;
          return oldData.filter((c) => c.id !== variables.columnId);
        }
      );
    },
  });
};
