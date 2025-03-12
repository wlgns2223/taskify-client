import { UseQueryResult } from "@tanstack/react-query";
import { Todo } from "../../../libs/dashboard/todo/dto/todo.dto";
import { TodoCard } from "./todo-card";

interface TodosProps {
  todo: UseQueryResult<Todo[], Error>;
}

export const Todos: React.FC<TodosProps> = ({ todo }) => {
  const isTodAvailable = todo.data && todo.data.length > 0;
  if (!isTodAvailable) {
    return null;
  }
  return (
    <ul className="mt-4 space-y-4">
      {todo.data?.map((todo) => (
        <li key={todo.id}>
          <TodoCard todo={todo} />
        </li>
      ))}
    </ul>
  );
};
