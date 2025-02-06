import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReadColumnDto, UpdateColumnDtoSchema } from "../dto/columns.dto";
import { useToast } from "../../../../core/hooks/useToast";
import { columnQueryOptions } from "../services/query-key";
import { columnService } from "../services/service";

type UpdateColumnDto = {
  columnId: number;
  newColumn: UpdateColumnDtoSchema;
};

export const useUpdateColumn = () => {
  const qc = useQueryClient();
  const { notify } = useToast();

  return useMutation({
    mutationFn: (updateColumnDto: UpdateColumnDto) =>
      columnService.update(updateColumnDto.columnId, updateColumnDto.newColumn),
    onMutate: async (column) => {
      await qc.cancelQueries({
        queryKey: columnQueryOptions.findBy(column.newColumn.dashboardId)
          .queryKey,
      });
      const previousColumns = qc.getQueryData<ReadColumnDto[]>(
        columnQueryOptions.findBy(column.newColumn.dashboardId).queryKey
      );
      if (previousColumns) {
        const updatedColumns = previousColumns.map((c) =>
          column.columnId === c.id
            ? {
                ...c,
                name: column.newColumn.name,
              }
            : c
        );

        qc.setQueryData(
          columnQueryOptions.findBy(column.newColumn.dashboardId).queryKey,
          updatedColumns
        );
      }

      return { previousColumns };
    },
    onError: (err, variables, context) => {
      if (context?.previousColumns) {
        qc.setQueryData(
          columnQueryOptions.findBy(variables.columnId).queryKey,
          context.previousColumns
        );
      }

      notify(err.message);
    },
    onSettled: (data, err, varialbe, context) => {
      qc.setQueryData<ReadColumnDto[]>(
        columnQueryOptions.findBy(varialbe.columnId).queryKey,
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
