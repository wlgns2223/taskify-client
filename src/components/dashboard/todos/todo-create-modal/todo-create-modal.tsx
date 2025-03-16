"use client";

import { BaseModalProps } from "../../../../core/types/base-modal";
import { JhModal } from "../../../../core/ui/modal/jh-modal";
import { TodoCreateBody } from "./todo-create-body";
import { TodoCreateProvider } from "../../../../libs/dashboard/todo/todo-create-context";
import { useCreateTodo } from "../../../../libs/dashboard/todo/hooks/useCreateTodo";

interface TodoCreateModalProps extends BaseModalProps {
  dashboardId: number;
  columnId: number;
}

export const TodoCreateModal: React.FC<TodoCreateModalProps> = ({
  modalProps: { isOpen, setIsOpen },
  columnId,
  dashboardId,
}) => {
  const { createTodoMutation, dashboardMembers, newTodo, setNewTodo } =
    useCreateTodo({
      columnId,
      dashboardId,
    });

  const handleCreateTodo = () => {
    createTodoMutation.mutate(newTodo);
  };

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
          handleCreateTodo();
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
