import { TodoCard } from "./todo-card";
import { useFetchTodoWithPagination } from "../../../libs/dashboard/todo/hooks/useFetchTodoWithPagination";

import { LoadMore } from "./load-more";

interface TodosProps {
  todo: ReturnType<typeof useFetchTodoWithPagination>["data"];
  fetchNextPage: ReturnType<typeof useFetchTodoWithPagination>["fetchNextPage"];
  hasNextPage: ReturnType<typeof useFetchTodoWithPagination>["hasNextPage"];
}

export const Todos: React.FC<TodosProps> = ({
  todo,
  fetchNextPage,
  hasNextPage,
}) => {
  if (todo.length === 0) {
    return null;
  }
  return (
    <>
      <ul className="mt-4 space-y-4">
        {todo.map((todo) => (
          <li key={todo.id}>
            <TodoCard todo={todo} />
          </li>
        ))}
      </ul>
      <LoadMore hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </>
  );
};
