import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SwapColumnsDtoSchema } from "../dto/swapColumns.dto";
import { columnService } from "../services/service";
import { columnQueryOptions } from "../services/query-key";
import { ReadColumnDto } from "../dto/columns.dto";
import { useToast } from "../../../../core/hooks/useToast";

export const useSwapColumnMutation = ({
  dashboardId,
}: {
  dashboardId: number;
}) => {
  const queryClient = useQueryClient();
  const { notify } = useToast();
  const swapColumns = (oldData: ReadColumnDto[], from: number, to: number) => {
    let newColumn = [...oldData];
    const fromIndex = oldData.findIndex((column) => column.position === from);
    const toIndex = oldData.findIndex((column) => column.position === to);

    [newColumn[fromIndex], newColumn[toIndex]] = [
      newColumn[toIndex],
      newColumn[fromIndex],
    ];
    return newColumn;
  };

  return useMutation({
    mutationFn: ({
      dashboardId,
      swapColumnsPosition,
    }: {
      dashboardId: number;
      swapColumnsPosition: SwapColumnsDtoSchema;
    }) => columnService.swapPosition(dashboardId, swapColumnsPosition),
    onMutate: async (props) => {
      await queryClient.cancelQueries({
        queryKey: columnQueryOptions.findBy(dashboardId).queryKey,
      });
      queryClient.setQueryData(
        columnQueryOptions.findBy(dashboardId).queryKey,
        (oldData: ReadColumnDto[]) =>
          swapColumns(
            oldData,
            props.swapColumnsPosition.from,
            props.swapColumnsPosition.to
          )
      );

      const prevColumns = queryClient.getQueryData(
        columnQueryOptions.findBy(dashboardId).queryKey
      );
      return {
        prevColumns,
      };
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: columnQueryOptions.findBy(dashboardId).queryKey,
      });
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        columnQueryOptions.findBy(dashboardId).queryKey,
        context?.prevColumns
      );
      notify(err.message);
    },
  });
};
