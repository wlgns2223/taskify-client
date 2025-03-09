import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { Todo } from "../../libs/dashboard/todo/dto/todo.dto";
import Image from "next/image";
import dayjs from "dayjs";

interface TodoCardProps {
  todo: Todo;
}
export const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  const tags = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    tag: `tag-${i}`,
  }));
  console.log(todo);
  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-md p-4 space-y-2">
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
      <p className="font-[500]">{todo.title}</p>
      <ul className="flex gap-1 text-xs text-red-700 flex-wrap">
        {tags.slice(10).map((tag) => (
          <li key={tag.id}>
            <p className="py-1 px-2 bg-red-400 rounded-md">{tag.tag}</p>
          </li>
        ))}
        {tags.length > 10 && (
          <li>
            <span>{"..."}</span>
          </li>
        )}
      </ul>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-xs">
          <CalendarDaysIcon className="w-5 h-5" />
          <span>{dayjs(todo.dueDate).format("YYYY-MM-DD")}</span>
        </div>
      </div>
    </div>
  );
};
