import { useState } from "react";
import { useModal } from "../../core/hooks/useModal";
import { JHInput } from "../../core/ui/jh-input";
import { JhModal } from "../../core/ui/modal/jh-modal";
import { useCreateColumnMutation } from "../../libs/dashboard/column/hooks/useCreateColumnMutation";

interface ColumnCreateModalProps {
  modalProps: ReturnType<typeof useModal>;
  createColumnMutation: ReturnType<typeof useCreateColumnMutation>;
  columnLength: number;
  dashboardId: number;
}

export const ColumnCreateModal: React.FC<ColumnCreateModalProps> = ({
  modalProps: { isOpen, setIsOpen },
  createColumnMutation,
  columnLength,
  dashboardId,
}) => {
  const [name, setName] = useState<string>("");
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleCreateColumn = (name: string) => {
    createColumnMutation.mutate({
      dashboardId,
      name,
      position: columnLength,
    });
    setIsOpen(false);
  };

  return (
    <JhModal
      closeButtonProps={{
        onClick: () => {
          setIsOpen(false);
          setName("");
        },
      }}
      confirmButtonProps={{
        onClick: () => {
          handleCreateColumn(name);
          setName("");
        },
        disabled: !name,
      }}
      isOpen={isOpen}
      className="w-full max-w-[540px]"
    >
      <div>
        <p className="text-2xl">{"새로운 컬럼 생성"}</p>
        <div className="mt-9">
          <label htmlFor="column-name" className="text-lg">
            {"컬럼 이름"}
          </label>
          <JHInput
            id="column-name"
            placeholder="새로운 컬럼"
            className="w-full mt-3"
            onChange={handleChangeName}
            value={name}
          />
        </div>
      </div>
    </JhModal>
  );
};
