import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateColumnDtoSchema, ReadColumnDto } from "../dto/columns.dto";
import { columnService } from "../services/service";
import { columnQueryOptions } from "../services/query-key";
import { useToast } from "../../../../core/hooks/useToast";

export const useCreateColumnMutation = ({
  dashboardId,
}: {
  dashboardId: number;
}) => {
  const appendColumn = (oldData: ReadColumnDto[], newColumn: ReadColumnDto) => {
    return [...oldData, newColumn];
  };
  const queryClient = useQueryClient();
  const { notify } = useToast();
  return useMutation({
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
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        columnQueryOptions.findBy(dashboardId).queryKey,
        context?.prevColumns
      );
      notify(err.message);
    },
  });
};
