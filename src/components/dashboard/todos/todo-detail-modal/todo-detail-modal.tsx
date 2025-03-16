import dayjs from "dayjs";
import { BaseModalProps } from "../../../../core/types/base-modal";
import { JhModal } from "../../../../core/ui/modal/jh-modal";
import { ReadColumnDto } from "../../../../libs/dashboard/column/dto/columns.dto";
import { Todo } from "../../../../libs/dashboard/todo/dto/todo.dto";
import { DetailTags } from "./detail-tags";
import Image from "next/image";
import { AssigneeAndDueDate } from "./assignee-and-due-date";

interface TodoDetailModalProps extends BaseModalProps {
  currentTodo: {
    currentColumn: ReadColumnDto;
    currentTodo: Todo;
  } | null;
}

export const TodoDetailModal: React.FC<TodoDetailModalProps> = ({
  modalProps: { isOpen, setIsOpen },
  currentTodo,
}) => {
  if (!currentTodo) {
    return null;
  }

  return (
    <JhModal
      isOpen={isOpen}
      closeButtonProps={{
        onClick: () => {
          setIsOpen(false);
        },
      }}
      className="w-full max-w-[730px]"
    >
      <div>
        <p className="text-2xl font-bold">{currentTodo?.currentTodo.title}</p>
        <div className=" flex mt-6 ">
          <div className="w-3/4 max-w-[450px]  flex flex-col ">
            <DetailTags
              columnName={currentTodo.currentColumn.name}
              tags={currentTodo.currentTodo.tags}
            />
            <div className="mt-4 text-sm break-words">
              {currentTodo.currentTodo.content}
            </div>
            {currentTodo.currentTodo.imageUrl && (
              <div className="relative w-full aspect-video mt-4">
                <Image
                  className="rounded-lg object-cover"
                  fill
                  src={currentTodo.currentTodo.imageUrl}
                  alt="todo image"
                />
              </div>
            )}
          </div>

          <AssigneeAndDueDate
            dueDate={currentTodo.currentTodo.dueDate}
            assigneeNicname={currentTodo.currentTodo.assignee.nickname}
          />
        </div>
      </div>
    </JhModal>
  );
};
