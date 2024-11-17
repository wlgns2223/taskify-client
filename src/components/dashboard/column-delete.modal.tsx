import { BaseModalProps } from "../../core/types/base-modal";
import { JhModal } from "../../core/ui/modal/jh-modal";

interface ColumnDeleteModalProps extends BaseModalProps {}

export const ColumnDeleteModal: React.FC<ColumnDeleteModalProps> = ({
  modalProps: { isOpen, setIsOpen },
}) => {
  return (
    <JhModal
      isOpen={isOpen}
      closeButtonProps={{
        onClick: () => {
          setIsOpen(false);
        },
      }}
      confirmButtonProps={{
        onClick: () => {
          setIsOpen(false);
        },
      }}
      className="w-full max-w-[540px]"
    >
      <p className="text-2xl">{"컬럼 삭제"}</p>
    </JhModal>
  );
};
