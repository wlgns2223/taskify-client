import { JhButton } from "../../core/ui/jh-button";
import { Cog6ToothIcon, PlusIcon } from "@heroicons/react/24/outline";
import { ReadColumnDto } from "../../libs/dashboard/dto/columns.dto";
import { useModal } from "../../core/hooks/useModal";
import { ColumnEditDropdown } from "./column-edit-dropdown";
import { ColumnEditModal } from "./column-edit-modal";
import { ColumnDeleteModal } from "./column-delete.modal";
import { DraggableProvided } from "@hello-pangea/dnd";

interface ColumnProps {
  column: ReadColumnDto;
  provided: DraggableProvided;
}

const Column: React.FC<ColumnProps> = ({ column, provided }) => {
  const editColumnModal = useModal();
  const deleteColumnModal = useModal();
  return (
    <>
      <div
        className="flex flex-col"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span className="ml-2 text-lg font-bold">{column.name}</span>
            <span className="flex justify-center items-center p-1 bg-neutral-200 text-sm rounded-[4px] text-neutral-700 w-5 h-5 ml-3  ">
              {"3"}
            </span>
          </div>
          <ColumnEditDropdown
            handleOpenEdit={() => editColumnModal.setIsOpen(true)}
            handleOpenDelete={() => deleteColumnModal.setIsOpen(true)}
          />
        </div>
        <JhButton
          className="flex justify-center items-center border-neutral-200 bg-white w-full max-w-[330px] whitespace-nowrap mt-5"
          variants="outline"
        >
          <PlusIcon className="w-4 h-4 text-primary bg-primary-light rounded-sm ml-3" />
        </JhButton>
      </div>
      <ColumnEditModal modalProps={editColumnModal} column={column} />
      <ColumnDeleteModal modalProps={deleteColumnModal} column={column} />
    </>
  );
};
export default Column;
