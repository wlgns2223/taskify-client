"use client";

import { BaseModalProps } from "../../../core/types/base-modal";
import { JhModal } from "../../../core/ui/modal/jh-modal";
import { useEffect, useState } from "react";
import {
  CreateTodoDto,
  CreateTodoDtoSchema,
} from "../../../libs/dashboard/dto/createTodo.dto";
import { useUserContext } from "../../../core/user/context";
import { useDashboardContext } from "../../../core/providers/dashboard-provider";
import { MemberList } from "./member-list";
import { TodoCreateProvider } from "../../../libs/dashboard/todo/todo-create-context";
import { TodoTitleInput } from "./title-input";
import { TodoCreateContent } from "./content";
import { TodoCreateDatePicker } from "./date-picker";
import { TodoCreateTags } from "./tags";
import { ImageInput } from "./image-input";

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
  const { dashboardMembers } = useDashboardContext();
  const [newTodo, setNewTodo] = useState<CreateTodoDto>({
    content: "",
    dueDate: "",
    title: "",
    position: 0,
    assigneeUserId: dashboardMembers[0].nickname,
    assignerUserId: userInfo.nickname,
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

  return (
    <TodoCreateProvider todo={newTodo} setTodo={setNewTodo}>
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
          <form className="mt-9 space-y-4">
            <MemberList members={dashboardMembers} />
            <TodoTitleInput />
            <TodoCreateContent />
            <TodoCreateDatePicker />
            <TodoCreateTags />
            <ImageInput />
          </form>
        </div>
      </JhModal>
    </TodoCreateProvider>
  );
};
