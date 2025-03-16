import { TodoCard } from "./todo-card";
import { useFetchTodoWithPagination } from "../../../libs/dashboard/todo/hooks/useFetchTodoWithPagination";

import { LoadMore } from "./load-more";
import { Dispatch, SetStateAction } from "react";
import { Todo } from "../../../libs/dashboard/todo/dto/todo.dto";

interface TodosProps {
  todo: ReturnType<typeof useFetchTodoWithPagination>["data"];
  fetchNextPage: ReturnType<typeof useFetchTodoWithPagination>["fetchNextPage"];
  hasNextPage: ReturnType<typeof useFetchTodoWithPagination>["hasNextPage"];
  handleClickCurrentTodo: (currentTodo: Todo) => void;
}

export const Todos: React.FC<TodosProps> = ({
  todo,
  fetchNextPage,
  hasNextPage,
  handleClickCurrentTodo,
}) => {
  if (todo.length === 0) {
    return null;
  }

  return (
    <>
      <ul className="mt-4 space-y-4">
        {todo.map((todo) => (
          <li key={todo.id}>
            <TodoCard
              todo={todo}
              handleClickCurrentTodo={handleClickCurrentTodo}
            />
          </li>
        ))}
      </ul>
      <LoadMore hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </>
  );
};
