import { useTodoCreateContext } from "../../../libs/dashboard/todo-create-context";

export const TodoCreateContent: React.FC = () => {
  const { setTodo, todo } = useTodoCreateContext();

  return (
    <div className="flex flex-col">
      <label
        className="after:content-['*'] after:text-red-400"
        htmlFor="todo-title"
      >
        {"설명"}
      </label>
      <textarea
        className="border border-neutral-300 rounded-lg p-4 w-full focus:outline-primary"
        id="todo-title"
        value={todo.content}
        onChange={(e) => {
          setTodo((prev) => ({
            ...prev,
            content: e.currentTarget.value,
          }));
        }}
      />
    </div>
  );
};
