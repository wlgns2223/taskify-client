"use client";

import { BaseModalProps } from "../../../core/types/base-modal";
import { JhModal } from "../../../core/ui/modal/jh-modal";
import { TodoCreateBody } from "./todo-create-body";

interface TodoCreateModalProps extends BaseModalProps {
  dashboardId: number;
  columnId: number;
}

export const TodoCreateModal: React.FC<TodoCreateModalProps> = ({
  modalProps: { isOpen, setIsOpen },
  columnId,
  dashboardId,
}) => {
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
      <TodoCreateBody columnId={columnId} dashboardId={dashboardId} />
    </JhModal>
  );
};
