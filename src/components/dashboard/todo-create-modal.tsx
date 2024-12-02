"use client";
import { Listbox, ListboxButton } from "@headlessui/react";
import { BaseModalProps } from "../../core/types/base-modal";
import { JhModal } from "../../core/ui/modal/jh-modal";
import { useEffect, useState } from "react";
import { CreateTodoDto } from "../../libs/dashboard/dto/createTodo.dto";
import { useUserContext } from "../../core/user/context";

interface TodoCreateModalProps extends BaseModalProps {
  dashboardId: string;
  columnId: string;
}

export const TodoCreateModal: React.FC<TodoCreateModalProps> = ({
  modalProps: { isOpen, setIsOpen },
  columnId,
  dashboardId,
}) => {
  const { userInfo } = useUserContext();
  const [newTodo, setNewTodo] = useState<CreateTodoDto>({
    assigneeUserId: "",
    assignerUserId: "",
    columnId: columnId,
    dashboardId: dashboardId,
    content: "",
    dueDate: "",
    position: 0,
    title: "",
  });

  useEffect(() => {
    setNewTodo((prev) => ({
      ...prev,
      columnId,
      dashboardId,
    }));
  }, [columnId, dashboardId]);

  console.log({ userInfo });

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
      <div>
        <p className="text-2xl">{"할 일 생성"}</p>

        <form className="mt-9">
          {/* <Listbox>
            <ListboxButton>

            </ListboxButton>

          </Listbox> */}
        </form>
      </div>
    </JhModal>
  );
};
