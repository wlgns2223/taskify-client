import { todoService } from "./todo.service";

const todoQueryKey = {
  todo: ["todos"] as const,
  findManyBy: (columnId: number) => [...todoQueryKey.todo, columnId] as const,
};

export const todoQueryOptions = {
  findManyBy: (columnId: number) => ({
    queryKey: [...todoQueryKey.findManyBy(columnId)],
    queryFn: () => todoService.findManyBy(columnId),
  }),
};
