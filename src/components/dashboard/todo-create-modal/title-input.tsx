import { FormEvent } from "react";
import { JHInput } from "../../../core/ui/jh-input";
import { useTodoCreateContext } from "../../../libs/dashboard/todo/todo-create-context";

export const TodoTitleInput: React.FC = () => {
  const { setTodo, todo } = useTodoCreateContext();

  const handleChangeTitle = (e: FormEvent<HTMLInputElement>) => {
    setTodo((prev) => ({
      ...prev,
      title: e.currentTarget.value,
    }));
  };

  return (
    <div className="flex flex-col">
      <label
        className="after:content-['*'] after:text-red-400"
        htmlFor="todo-title"
      >
        {"제목"}
      </label>
      <JHInput
        id="todo-title"
        value={todo.title}
        onChange={handleChangeTitle}
      />
    </div>
  );
};
