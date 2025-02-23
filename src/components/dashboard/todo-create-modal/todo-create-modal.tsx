"use client";

import { useState } from "react";
import { useDashboardContext } from "../../../core/providers/dashboard-provider";
import { BaseModalProps } from "../../../core/types/base-modal";
import { JhModal } from "../../../core/ui/modal/jh-modal";
import { useUserContext } from "../../../core/user/context";
import { TodoCreateBody } from "./todo-create-body";
import { CreateTodoDto } from "../../../libs/dashboard/todo/dto/createTodo.dto";
import { TodoCreateProvider } from "../../../libs/dashboard/todo/todo-create-context";

interface TodoCreateModalProps extends BaseModalProps {
  dashboardId: number;
  columnId: number;
}

export const TodoCreateModal: React.FC<TodoCreateModalProps> = ({
  modalProps: { isOpen, setIsOpen },
  columnId,
  dashboardId,
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
  return (
    <JhModal
      isOpen={isOpen}
      closeButtonProps={{
        onClick: () => {
          setIsOpen(false);
        },
      }}
      confirmButtonProps={{
        onClick: () => {
          setIsOpen(false);
        },
      }}
      className="w-full max-w-[540px]"
    >
      <TodoCreateProvider todo={newTodo} setTodo={setNewTodo}>
        <TodoCreateBody dashboardMembers={dashboardMembers} />
      </TodoCreateProvider>
    </JhModal>
  );
};
