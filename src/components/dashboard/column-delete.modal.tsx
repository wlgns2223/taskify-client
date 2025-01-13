import { BaseModalProps } from "../../core/types/base-modal";
import { JhModal } from "../../core/ui/modal/jh-modal";
import { ReadColumnDto } from "../../libs/dashboard/column/dto/columns.dto";
import { useDeleteColumn } from "../../libs/dashboard/column/hooks/useDeleteColumn";

interface ColumnDeleteModalProps extends BaseModalProps {
  column: ReadColumnDto;
}

export const ColumnDeleteModal: React.FC<ColumnDeleteModalProps> = ({
  modalProps: { isOpen, setIsOpen },
  column,
}) => {
  const { mutate } = useDeleteColumn();
  const handleDeleteColumn = () => {
    mutate({
      dashboardId: column.dashboardId,
      id: column.id,
    });
  };
  return (
    <JhModal
      isOpen={isOpen}
      closeButtonProps={{
        variants: "normal",
        onClick: () => {
          setIsOpen(false);
        },
      }}
      confirmText="삭제"
      confirmButtonProps={{
        variants: "outline",
        className: "bg-red-600 border border-red-600 text-white",
        onClick: () => {
          setIsOpen(false);
          handleDeleteColumn();
        },
      }}
      className="w-full max-w-[540px]"
    >
      <p className="text-2xl">{"컬럼 삭제"}</p>
    </JhModal>
  );
};
