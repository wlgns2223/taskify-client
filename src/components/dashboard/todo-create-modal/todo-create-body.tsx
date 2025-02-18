import { useState } from "react";
import { useDashboardContext } from "../../../core/providers/dashboard-provider";
import { useUserContext } from "../../../core/user/context";
import { CreateTodoDto } from "../../../libs/dashboard/dto/createTodo.dto";
import { TodoCreateProvider } from "../../../libs/dashboard/todo/todo-create-context";
import { MemberList } from "./member-list";
import { TodoTitleInput } from "./title-input";
import { TodoCreateContent } from "./content";
import { TodoCreateDatePicker } from "./date-picker";
import { TodoCreateTags } from "./tags";
import { ImageInput } from "./image-input";

interface TodoCreateModalProps {
  dashboardId: number;
  columnId: number;
}

export const TodoCreateBody: React.FC<TodoCreateModalProps> = ({
  columnId,
  dashboardId,
}) => {
  const { userInfo } = useUserContext();
  const { dashboardMembers } = useDashboardContext();
  const [newTodo, setNewTodo] = useState<CreateTodoDto>({
    content: "",
    dueDate: new Date(),
    title: "",
    position: 0,
    assigneeUserId: dashboardMembers[0].id,
    assignerUserId: userInfo.id,
    columnId: columnId,
    dashboardId: dashboardId,
  });
  return (
    <TodoCreateProvider todo={newTodo} setTodo={setNewTodo}>
      <div>
        <p className="text-2xl">{"할 일 생성"}</p>
        <form className="mt-9 space-y-4">
          <MemberList
            members={Array.from({ length: 10 }).flatMap(() => dashboardMembers)}
          />
          <TodoTitleInput />
          <TodoCreateContent />
          <TodoCreateDatePicker />
          <TodoCreateTags />
          <ImageInput />
        </form>
      </div>
    </TodoCreateProvider>
  );
};
