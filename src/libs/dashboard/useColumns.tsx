import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { queryOptions } from "../dashboard/query-options";
import { SwapColumnsDtoSchema } from "./dto/swapColumns.dto";
import { dashboardService } from "./dashboard.service";
import { CreateColumnDtoSchema, ReadColumnDto } from "./dto/columns.dto";
import { useToast } from "../../core/hooks/useToast";

export const useColumns = (dashboardId: string) => {
  const { data: columns } = useSuspenseQuery({
    ...queryOptions.getColumnsBydashboardId(dashboardId),
  });
  const { notify } = useToast();
  const queryClient = useQueryClient();

  const appendColumn = (oldData: ReadColumnDto[], newColumn: ReadColumnDto) => {
    return [...oldData, newColumn];
  };

  const createColumnMutation = useMutation({
    mutationFn: async (createColumnDto: CreateColumnDtoSchema) =>
      dashboardService.createColumn(createColumnDto),
    onMutate: async (createColumnDto: CreateColumnDtoSchema) => {
      await queryClient.cancelQueries({
        queryKey: queryOptions.getColumnsBydashboardId(dashboardId).queryKey,
      });
      queryClient.setQueryData(
        queryOptions.getColumnsBydashboardId(dashboardId).queryKey,

        (oldData: ReadColumnDto[]) =>
          appendColumn(oldData, {
            ...createColumnDto,
            id: Math.random(),
            position: oldData.length,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
      );
      const prevColumns = queryClient.getQueryData(
        queryOptions.getColumnsBydashboardId(dashboardId).queryKey
      );

      return { prevColumns };
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryOptions.getColumnsBydashboardId(dashboardId).queryKey,
      });
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        queryOptions.getColumnsBydashboardId(dashboardId).queryKey,
        context?.prevColumns
      );
      notify(err.message);
    },
  });

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

  const swapColumnsMutation = useMutation({
    mutationFn: ({
      dashboardId,
      swapColumnsPosition,
    }: {
      dashboardId: string;
      swapColumnsPosition: SwapColumnsDtoSchema;
    }) =>
      dashboardService.swapColumnsPosition(dashboardId, swapColumnsPosition),
    onMutate: async (props) => {
      await queryClient.cancelQueries({
        queryKey: queryOptions.getColumnsBydashboardId(dashboardId).queryKey,
      });
      queryClient.setQueryData(
        queryOptions.getColumnsBydashboardId(dashboardId).queryKey,
        (oldData: ReadColumnDto[]) =>
          swapColumns(
            oldData,
            props.swapColumnsPosition.from,
            props.swapColumnsPosition.to
          )
      );

      const prevColumns = queryClient.getQueryData(
        queryOptions.getColumnsBydashboardId(dashboardId).queryKey
      );
      return {
        prevColumns,
      };
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryOptions.getColumnsBydashboardId(dashboardId).queryKey,
      });
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        queryOptions.getColumnsBydashboardId(dashboardId).queryKey,
        context?.prevColumns
      );
      notify(err.message);
    },
  });

  return {
    columns,
    swapColumnsMutation,
    createColumnMutation,
  };
};
