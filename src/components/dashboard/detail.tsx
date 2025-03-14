"use client";

import { JhButton } from "../../core/ui/jh-button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ReadColumnDto } from "../../libs/dashboard/column/dto/columns.dto";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { SwapColumnsDtoSchema } from "../../libs/dashboard/column/dto/swapColumns.dto";
import { useColumns } from "../../libs/dashboard/column/hooks/useColumns";
import { ColumnCreateModal } from "./column-create-modal";
import { useModal } from "../../core/hooks/useModal";
import { PropsWithChildren } from "react";
import { Todos } from "./todos/todos";
import { TodoCreateModal } from "./todo-create-modal/todo-create-modal";
import { ColumnHeader } from "./column-header";
import { useFetchAllTodosOfAllColumns } from "../../libs/dashboard/todo/hooks/useFetchAllTodosOfAllColumns";
import { useFetchTodoWithPagination } from "../../libs/dashboard/todo/hooks/useFetchTodoWithPagination";
import { useCreateTodoModal } from "../../libs/dashboard/todo/hooks/useCreateTodoModal";
import { useMediaQuery } from "usehooks-ts";

interface DetailPageProps {
  dashboardId: number;
}

const Detail: React.FC<PropsWithChildren<DetailPageProps>> = ({
  dashboardId,
}) => {
  const columnCreateModalProps = useModal();
  const { selectedColumn, setSelectedColumn, todoCreateModalProps } =
    useCreateTodoModal();
  const { columns, swapColumnsMutation, createColumnMutation } =
    useColumns(dashboardId);

  const { todoMap } = useFetchAllTodosOfAllColumns({
    columnIds: columns.map((column) => column.id),
  });

  const handleDragend = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const swapColumnsPosition: SwapColumnsDtoSchema = {
      from: result.source.index,
      to: result.destination.index,
    };
    swapColumnsMutation.mutate({
      dashboardId,
      swapColumnsPosition,
    });
  };

  return (
    <>
      <div className="overflow-scroll h-full">
        <DragDropContext onDragEnd={handleDragend}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided) => (
              <ul
                className="flex min-w-full flex-col lg:flex-row divide-y lg:divide-y-0"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {columns.map((column: ReadColumnDto) => (
                  <Draggable
                    key={column.id}
                    draggableId={column.id.toString()}
                    index={column.position}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="p-2 lg:p-4 lg:min-w-[300px] lg:border-r"
                      >
                        <ColumnHeader
                          column={column}
                          provided={provided}
                          setSelectedColumn={setSelectedColumn}
                          todo={todoMap.get(column.id)}
                        />
                        <Todos columnId={column.id} />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <li className="p-2 lg:p-4 min-w-[300px]">
                  <JhButton
                    className=" mt-0 lg:mt-4   flex justify-center items-center border-neutral-200 bg-white w-full lg:max-w-[330px] whitespace-nowrap"
                    variants="outline"
                    onClick={() => columnCreateModalProps.setIsOpen(true)}
                  >
                    <p>{"새로운 컬럼추가"}</p>
                    <PlusIcon className="w-4 h-4 text-primary bg-primary-light rounded-sm ml-3" />
                  </JhButton>
                </li>
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {selectedColumn && (
        <TodoCreateModal
          modalProps={todoCreateModalProps}
          columnId={selectedColumn}
          dashboardId={dashboardId}
        />
      )}

      <ColumnCreateModal
        modalProps={columnCreateModalProps}
        createColumnMutation={createColumnMutation}
        columnLength={columns.length}
        dashboardId={dashboardId}
      />
    </>
  );
};
export default Detail;
