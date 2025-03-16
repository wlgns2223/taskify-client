import { ChangeEvent } from "react";
import { useTodoCreateContext } from "../../../../libs/dashboard/todo/todo-create-context";

export const TodoCreateContent: React.FC = () => {
  const { setTodo, todo } = useTodoCreateContext();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTodo((prev) => ({
      ...prev,
      content: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col">
      <label
        className="after:content-['*'] after:text-red-400"
        htmlFor="todo-title"
      >
        {"설명"}
      </label>
      <textarea
        className="border border-neutral-300 rounded-lg px-4 py-2 w-full focus:border-primary outline-none"
        id="todo-title"
        value={todo.content}
        onChange={handleChange}
      />
    </div>
  );
};
