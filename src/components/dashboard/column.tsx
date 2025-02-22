import { ReadColumnDto } from "../../libs/dashboard/column/dto/columns.dto";
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
        className="flex items-center justify-between"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <div className="flex items-center">
          <div className="w-2 h-2 bg-primary rounded-full" />
          <span className="ml-2 text-lg font-bold">{column.name}</span>
          <span className="flex justify-center items-center p-1 bg-neutral-200 text-sm rounded-[4px] text-neutral-700 w-5 h-5 ml-3  ">
            {`column id: ${column.id}`}
          </span>
        </div>
        <ColumnEditDropdown
          handleOpenEdit={() => editColumnModal.setIsOpen(true)}
          handleOpenDelete={() => deleteColumnModal.setIsOpen(true)}
        />
      </div>
      <ColumnEditModal modalProps={editColumnModal} column={column} />
      <ColumnDeleteModal modalProps={deleteColumnModal} column={column} />
    </>
  );
};
export default Column;
