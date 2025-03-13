import { TodoCard } from "./todo-card";
import { useFetchTodoWithPagination } from "../../../libs/dashboard/todo/hooks/useFetchTodoWithPagination";
import { useIntersectionObserver, useMediaQuery } from "usehooks-ts";
import { JhButton } from "../../../core/ui/jh-button";
import { LoadMore } from "./load-more";

const PC_PAGE_SIZE = 10;
const MOBILE_PAGE_SIZE = 5;
interface TodosProps {
  columnId: number;
}

export const Todos: React.FC<TodosProps> = ({ columnId }) => {
  const isPC = useMediaQuery("(min-width: 1024px)");

  const {
    data: todo,
    fetchNextPage,
    hasNextPage,
  } = useFetchTodoWithPagination(columnId, {
    page: 1,
    pageSize: isPC ? PC_PAGE_SIZE : MOBILE_PAGE_SIZE,
  });

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
      <LoadMore
        isPC={isPC}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </>
  );
};
