import { todoService } from "./todo.service";

const todoQueryKey = {
  todo: ["todos"] as const,
  todosByColumnId: (columnId: string) =>
    [...todoQueryKey.todo, columnId] as const,
};

export const todoQueryOptions = {
  getTodosByColumnId: (columnId: string) => ({
    queryKey: [...todoQueryKey.todosByColumnId(columnId)],
    queryFn: () => todoService.getTodosByColumnId(columnId),
  }),
};
