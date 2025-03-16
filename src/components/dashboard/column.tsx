import { EllipsisHorizontalIcon, PlusIcon } from "@heroicons/react/24/outline";
import { JhButton } from "../../core/ui/jh-button";
import { ReadColumnDto } from "../../libs/dashboard/column/dto/columns.dto";
import { DraggableProvided } from "@hello-pangea/dnd";
import { ColumnHeader } from "./column-header";
import { Todos } from "./todos/todos";
import { useFetchTodoWithPagination } from "../../libs/dashboard/todo/hooks/useFetchTodoWithPagination";
import { JHSuspense } from "../../core/ui/jh-suspense";
import { Dispatch, SetStateAction } from "react";
import { Todo } from "../../libs/dashboard/todo/dto/todo.dto";

interface ColumnProps {
  column: ReadColumnDto;
  provided: DraggableProvided;
  setSelectedColumn: (columnId: number) => void;
  handleClickCurrentTodo: (currentTodo: Todo) => void;
}

export const Column: React.FC<ColumnProps> = ({
  column,
  provided,
  setSelectedColumn,
  handleClickCurrentTodo,
}) => {
  const {
    data: todo,
    fetchNextPage,
    hasNextPage,
  } = useFetchTodoWithPagination(column.id, {
    page: 1,
    pageSize: 5,
  });
  return (
    <>
      <div {...provided.dragHandleProps} className="flex w-full justify-center">
        <EllipsisHorizontalIcon className="w-6 h-6" />
      </div>
      <ColumnHeader column={column} numberOfTodos={todo.length} />

      <JhButton
        className="flex justify-center items-center border-neutral-200 bg-white w-full lg:max-w-[330px] whitespace-nowrap mt-5"
        variants="outline"
        onClick={() => setSelectedColumn(column.id)}
      >
        <PlusIcon className="w-4 h-4 text-primary bg-primary-light rounded-sm ml-3" />
      </JhButton>
      <JHSuspense className="mt-4">
        <Todos
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          todo={todo}
          handleClickCurrentTodo={handleClickCurrentTodo}
        />
      </JHSuspense>
    </>
  );
};
