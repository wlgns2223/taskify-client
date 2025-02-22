import { useState } from "react";
import { BaseModalProps } from "../../core/types/base-modal";
import { JHInput } from "../../core/ui/jh-input";
import { JhModal } from "../../core/ui/modal/jh-modal";
import {
  UpdateColumnDto,
  useUpdateColumn,
} from "../../libs/dashboard/column/hooks/useUpdateColumn";
import {
  ReadColumnDto,
  UpdateColumnDtoSchema,
} from "../../libs/dashboard/column/dto/columns.dto";

interface ColumnEditModalProps extends BaseModalProps {
  column: ReadColumnDto;
}

export const ColumnEditModal: React.FC<ColumnEditModalProps> = ({
  modalProps: { isOpen, setIsOpen },
  column,
}) => {
  const [name, setName] = useState<string>(column.name);
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const { mutate } = useUpdateColumn();

  const handleUpdateColumn = () => {
    const updateColumnDto: UpdateColumnDto = {
      columnId: column.id,
      newColumn: {
        ...column,
        name,
      },
    };
    mutate(updateColumnDto);
  };
  return (
    <JhModal
      isOpen={isOpen}
      confirmButtonProps={{
        onClick: () => {
          setIsOpen(false);
          handleUpdateColumn();
        },
      }}
      closeButtonProps={{
        onClick: () => {
          setIsOpen(false);
          setName(column.name);
        },
      }}
      className="w-full max-w-[540px]"
    >
      <div>
        <p className="text-2xl">{"컬럼 이름 변경"}</p>
        <div className="mt-9">
          <label htmlFor="column-name" className="text-lg">
            {"컬럼 이름"}
          </label>
          <JHInput
            id="column-name"
            placeholder="새로운 이름"
            className="w-full mt-3"
            onChange={handleChangeName}
            value={name}
          />
        </div>
      </div>
    </JhModal>
  );
};
