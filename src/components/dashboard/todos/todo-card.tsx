import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { Todo } from "../../../libs/dashboard/todo/dto/todo.dto";
import Image from "next/image";
import dayjs from "dayjs";
import { Tags } from "./tags";
import { JhButton } from "../../../core/ui/jh-button";

interface TodoCardProps {
  todo: Todo;
}
export const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  return (
    <JhButton
      className=" w-full border border-neutral-200 rounded-md p-4 bg-neutral-50 text-start"
      variants="reset"
    >
      <div className="space-y-2">
        {todo.imageUrl && (
          <div className="w-full aspect-video relative">
            <Image
              src={todo.imageUrl}
              alt="todo image"
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}
        <p className="font-[500] text-ellipsis ">{todo.title}</p>
        <Tags tags={todo.tags} />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs">
            <CalendarDaysIcon className="w-5 h-5" />
            <span>{dayjs(todo.dueDate).format("YYYY-MM-DD")}</span>
          </div>
          <div className="w-6 h-6 rounded-full bg-green-400 flex justify-center items-center">
            <span>{todo.assignee.nickname[0]}</span>{" "}
          </div>
        </div>
      </div>
    </JhButton>
  );
};
