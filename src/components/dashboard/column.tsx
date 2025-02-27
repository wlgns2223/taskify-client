import { ReadColumnDto } from "../../libs/dashboard/column/dto/columns.dto";
import { useModal } from "../../core/hooks/useModal";
import { ColumnEditDropdown } from "./column-edit-dropdown";
import { ColumnEditModal } from "./column-edit-modal";
import { ColumnDeleteModal } from "./column-delete.modal";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

interface ColumnProps {
  column: ReadColumnDto;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  const editColumnModal = useModal();
  const deleteColumnModal = useModal();
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-primary rounded-full" />
          <span className="ml-2 text-lg font-bold">{column.name}</span>
          <span className="flex justify-center items-center px-1 py-0.5 bg-neutral-200 text-sm rounded-[4px] text-neutral-700  ml-3  ">
            {column.id}
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
