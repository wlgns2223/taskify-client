import { EllipsisHorizontalIcon, PlusIcon } from "@heroicons/react/24/outline";
import Column from "./column";
import { JhButton } from "../../core/ui/jh-button";
import { ReadColumnDto } from "../../libs/dashboard/column/dto/columns.dto";
import { DraggableProvided } from "@hello-pangea/dnd";
import { UseQueryResult } from "@tanstack/react-query";
import { Todo } from "../../libs/dashboard/todo/dto/todo.dto";

interface ColumnHeaderProps {
  column: ReadColumnDto;
  provided: DraggableProvided;
  setSelectedColumn: (columnId: number) => void;
  todo: UseQueryResult<Todo[], Error>;
}

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({
  column,
  provided,
  setSelectedColumn,
  todo,
}) => {
  return (
    <>
      <div {...provided.dragHandleProps} className="flex w-full justify-center">
        <EllipsisHorizontalIcon className="w-6 h-6" />
      </div>
      <Column column={column} todo={todo} />

      <JhButton
        className="flex justify-center items-center border-neutral-200 bg-white w-full max-w-[330px] whitespace-nowrap mt-5"
        variants="outline"
        onClick={() => setSelectedColumn(column.id)}
      >
        <PlusIcon className="w-4 h-4 text-primary bg-primary-light rounded-sm ml-3" />
      </JhButton>
    </>
  );
};
