import { useEffect, useState } from "react";
import { useModal } from "../../../../core/hooks/useModal";

export const useCreateTodoModal = () => {
  const todoCreateModalProps = useModal();
  const [selectedColumn, setSelectedColumn] = useState<number | undefined>();

  useEffect(() => {
    if (selectedColumn !== undefined) {
      todoCreateModalProps.setIsOpen(true);
    }

    if (!todoCreateModalProps.isOpen) {
      setSelectedColumn(undefined);
    }
  }, [selectedColumn, todoCreateModalProps.isOpen]);

  return {
    todoCreateModalProps,
    selectedColumn,
    setSelectedColumn,
  };
};
