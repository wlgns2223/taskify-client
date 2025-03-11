import { useEffect, useState } from "react";
import { useDashboardContext } from "../../../../core/providers/dashboard-provider";
import { useUserContext } from "../../../../core/user/context";
import { CreateTodoDto } from "../dto/createTodo.dto";
import { useCreateTodoMutation } from "./useCreateTodoMutation";

export const useCreateTodo = ({
  columnId,
  dashboardId,
}: {
  columnId: number;
  dashboardId: number;
}) => {
  const { userInfo } = useUserContext();
  const { dashboardMembers } = useDashboardContext();
  const TODO_DEFAULT = {
    content: "",
    dueDate: new Date().toDateString(),
    title: "",
    assigneeUserId: dashboardMembers[0].memberId,
    assignerUserId: userInfo.id,
    columnId: columnId,
    dashboardId: dashboardId,
    tags: [],
  };
  const [newTodo, setNewTodo] = useState<CreateTodoDto>(TODO_DEFAULT);

  useEffect(() => {
    setNewTodo((prev) => ({
      ...prev,
      columnId,
      dashboardId,
    }));

    return () => {
      setNewTodo(TODO_DEFAULT);
    };
  }, [columnId, dashboardId]);

  const createTodoMutation = useCreateTodoMutation();

  return {
    dashboardMembers,
    newTodo,
    setNewTodo,
    createTodoMutation,
  };
};
