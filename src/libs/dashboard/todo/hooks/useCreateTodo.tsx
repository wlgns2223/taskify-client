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
  const [newTodo, setNewTodo] = useState<CreateTodoDto>({
    content: "",
    dueDate: new Date(),
    title: "",
    assigneeUserId: dashboardMembers[0].id,
    assignerUserId: userInfo.id,
    columnId: columnId,
    dashboardId: dashboardId,
  });

  useEffect(() => {
    setNewTodo((prev) => ({
      ...prev,
      columnId,
      dashboardId,
    }));
  }, [columnId, dashboardId]);

  const createTodoMutation = useCreateTodoMutation();

  return {
    dashboardMembers,
    newTodo,
    setNewTodo,
    createTodoMutation,
  };
};
