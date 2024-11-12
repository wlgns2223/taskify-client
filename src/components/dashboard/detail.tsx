"use client";

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { queryOptions } from "../../libs/dashboard/query-options";
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
import { dashboardService } from "../../libs/dashboard/dashboard.service";
import { SwapColumnsDtoSchema } from "../../libs/dashboard/dto/swapColumns.dto";
import { useParams } from "next/navigation";

interface DetailPageProps {
  dashboardId: string;
}

const Detail: React.FC<DetailPageProps> = ({ dashboardId }) => {
  const { data: columns } = useSuspenseQuery({
    ...queryOptions.getColumnsBydashboardId(dashboardId),
  });

  const { mutateAsync } = useMutation({
    mutationFn: ({
      dashboardId,
      swapColumnsPosition,
    }: {
      dashboardId: string;
      swapColumnsPosition: SwapColumnsDtoSchema;
    }) =>
      dashboardService.swapColumnsPosition(dashboardId, swapColumnsPosition),
  });

  const queryClient = useQueryClient();

  const handleDragend = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const swapColumnsPosition: SwapColumnsDtoSchema = {
      from: result.source.index,
      to: result.destination.index,
    };
    try {
      await mutateAsync({
        dashboardId,
        swapColumnsPosition,
      });
      queryClient.invalidateQueries({
        queryKey: [
          ...queryOptions.getColumnsBydashboardId(dashboardId).queryKey,
        ],
      });
    } catch (e) {
      console.error(e);
    }
  };

  console.log("columns", columns);

  return (
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
                <Draggable
                  key={column.id}
                  draggableId={column.id.toString()}
                  index={column.position}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="px-2 min-w-[300px] border-r"
                    >
                      <Column column={column} />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <li className="ml-2 min-w-[300px]">
                <JhButton
                  className="flex justify-center items-center border-neutral-200 bg-white w-full max-w-[330px] whitespace-nowrap"
                  variants="outline"
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
  );
};
export default Detail;
