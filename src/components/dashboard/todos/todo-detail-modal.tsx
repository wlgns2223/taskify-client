import { BaseModalProps } from "../../../core/types/base-modal";
import { JhModal } from "../../../core/ui/modal/jh-modal";
import { Todo } from "../../../libs/dashboard/todo/dto/todo.dto";

interface TodoDetailModalProps extends BaseModalProps {
  todo: Todo;
}

export const TodoDetailModal: React.FC<TodoDetailModalProps> = ({
  modalProps: { isOpen, setIsOpen },
}) => {
  return <JhModal isOpen={isOpen}></JhModal>;
};
