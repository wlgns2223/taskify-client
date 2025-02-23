import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTodoDto } from "../dto/createTodo.dto";
import { todoService } from "../services/todo.service";
import { todoQueryOptions } from "../services/query-key";
import { Todo } from "../dto/todo.dto";
import { useToast } from "../../../../core/hooks/useToast";

export const useCreateTodoMutation = () => {
  const queryClient = useQueryClient();
  const { notify } = useToast();
  return useMutation({
    mutationFn: async (createTodoDto: CreateTodoDto) =>
      todoService.create(createTodoDto),
    onMutate: async (createTodoDto: CreateTodoDto) => {
      await queryClient.cancelQueries({
        queryKey: todoQueryOptions.findManyBy(createTodoDto.columnId).queryKey,
      });
      const prevTodos = queryClient.getQueryData<Todo[]>(
        todoQueryOptions.findManyBy(createTodoDto.columnId).queryKey
      );

      const newTodo: Todo = {
        assigneeUserId: createTodoDto.assigneeUserId,
        assignerUserId: createTodoDto.assignerUserId,
        columnId: createTodoDto.columnId,
        content: createTodoDto.content,
        dashboardId: createTodoDto.dashboardId,
        dueDate: createTodoDto.dueDate,
        position: prevTodos?.length ?? 0,
        title: createTodoDto.title,
        id: Math.random(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      queryClient.setQueryData(
        todoQueryOptions.findManyBy(createTodoDto.columnId).queryKey,
        (oldData: Todo[]) => [...oldData, newTodo]
      );

      return { prevTodos };
    },
    onError: (err, vairables, context) => {
      queryClient.setQueryData(
        todoQueryOptions.findManyBy(vairables.columnId).queryKey,
        context?.prevTodos
      );
      notify(err.message);
    },
  });
};
