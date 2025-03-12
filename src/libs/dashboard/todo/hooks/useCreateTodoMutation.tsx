import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTodoDto } from "../dto/createTodo.dto";
import { todoService } from "../services/todo.service";
import { todoQueryOptions } from "../services/query-key";
import { Todo } from "../dto/todo.dto";
import { useToast } from "../../../../core/hooks/useToast";
import { useDashboardContext } from "../../../../core/providers/dashboard-provider";

type CreateTodoMutationProps = {
  dashboardMembers: ReturnType<typeof useDashboardContext>["dashboardMembers"];
};

export const useCreateTodoMutation = ({
  dashboardMembers,
}: CreateTodoMutationProps) => {
  const queryClient = useQueryClient();
  const { notify } = useToast();
  return useMutation({
    mutationFn: async (createTodoDto: CreateTodoDto) =>
      await todoService.create(createTodoDto),

    onMutate: async (createTodoDto: CreateTodoDto) => {
      await queryClient.cancelQueries({
        queryKey: todoQueryOptions.findManyBy(createTodoDto.columnId).queryKey,
      });
      const prevTodos = queryClient.getQueryData<Todo[]>(
        todoQueryOptions.findManyBy(createTodoDto.columnId).queryKey
      );

      const assignee = dashboardMembers.find(
        (member) => member.memberId === createTodoDto.assigneeUserId
      );

      const newTodo: Todo = {
        assigneeUserId: createTodoDto.assigneeUserId,
        assignerUserId: createTodoDto.assignerUserId,
        tags: Array.from({ length: createTodoDto.tags.length }).map((_, i) => ({
          id: i,
          tag: createTodoDto.tags[i],
        })),
        assignee: !!assignee
          ? {
              id: assignee.memberId,
              email: "",
              nickname: assignee.nickname,
              createdAt: new Date(),
              updatedAt: new Date(),
            }
          : {
              id: Math.random(),
              email: "",
              nickname: "임시",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
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
        (oldData: Todo[]) => {
          return [newTodo, ...(oldData ?? [])];
        }
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
