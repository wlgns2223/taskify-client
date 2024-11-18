"use client";

import { JhButton } from "../../core/ui/jh-button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ReadColumnDto } from "../../libs/dashboard/dto/columns.dto";
import Column from "./column";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { SwapColumnsDtoSchema } from "../../libs/dashboard/dto/swapColumns.dto";
import { useColumns } from "../../libs/dashboard/useColumns";
import { ColumnCreateModal } from "./column-create-modal";
import { useModal } from "../../core/hooks/useModal";
import { PropsWithChildren } from "react";
import { Todos } from "./todos";

interface DetailPageProps {
  dashboardId: string;
}

const Detail: React.FC<PropsWithChildren<DetailPageProps>> = ({
  dashboardId,
}) => {
  const { columns, swapColumnsMutation, createColumnMutation } =
    useColumns(dashboardId);

  const modalProps = useModal();

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

  const handleCreateColumn = (name: string) => {
    createColumnMutation.mutate({
      dashboardId: parseInt(dashboardId, 10),
      name,
      position: columns.length,
    });
    modalProps.setIsOpen(false);
  };

  return (
    <>
      <div className="overflow-scroll h-full">
        <DragDropContext onDragEnd={handleDragend}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided) => (
              <ul
                className="flex h-full"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {columns.map((column: ReadColumnDto) => (
                  <li key={column.id} className="px-2 min-w-[300px] border-r">
                    <Draggable
                      draggableId={column.id.toString()}
                      index={column.position}
                    >
                      {(provided) => (
                        <Column column={column} provided={provided} />
                      )}
                    </Draggable>
                    <Todos columnId={column.id} />
                  </li>
                ))}
                {provided.placeholder}
                <li className="ml-2 min-w-[300px]">
                  <JhButton
                    className="flex justify-center items-center border-neutral-200 bg-white w-full max-w-[330px] whitespace-nowrap"
                    variants="outline"
                    onClick={() => modalProps.setIsOpen(true)}
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
      <ColumnCreateModal
        modalProps={modalProps}
        handleCreateColumn={handleCreateColumn}
      />
    </>
  );
};
export default Detail;
