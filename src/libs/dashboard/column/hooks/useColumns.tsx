import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { SwapColumnsDtoSchema } from "../dto/swapColumns.dto";
import { CreateColumnDtoSchema, ReadColumnDto } from "../dto/columns.dto";
import { useToast } from "../../../../core/hooks/useToast";
import { columnQueryOptions } from "../services/query-key";
import { columnService } from "../services/service";

export const useColumns = (dashboardId: number) => {
  const { data: columns } = useSuspenseQuery({
    ...columnQueryOptions.findBy(dashboardId),
  });
  const { notify } = useToast();
  const queryClient = useQueryClient();

  const appendColumn = (oldData: ReadColumnDto[], newColumn: ReadColumnDto) => {
    return [...oldData, newColumn];
  };

  const createColumnMutation = useMutation({
    mutationFn: async (createColumnDto: CreateColumnDtoSchema) =>
      columnService.create(createColumnDto),
    onMutate: async (createColumnDto: CreateColumnDtoSchema) => {
      await queryClient.cancelQueries({
        queryKey: columnQueryOptions.findBy(dashboardId).queryKey,
      });
      queryClient.setQueryData(
        columnQueryOptions.findBy(dashboardId).queryKey,
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
        columnQueryOptions.findBy(dashboardId).queryKey
      );

      return { prevColumns };
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

  return {
    columns,
    swapColumnsMutation,
    createColumnMutation,
  };
};
