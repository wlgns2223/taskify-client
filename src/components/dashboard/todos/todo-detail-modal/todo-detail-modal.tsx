import dayjs from "dayjs";
import { BaseModalProps } from "../../../../core/types/base-modal";
import { JhModal } from "../../../../core/ui/modal/jh-modal";
import { ReadColumnDto } from "../../../../libs/dashboard/column/dto/columns.dto";
import { Todo } from "../../../../libs/dashboard/todo/dto/todo.dto";
import { DetailTags } from "./detail-tags";
import Image from "next/image";
import { AssigneeAndDueDate } from "./assignee-and-due-date";
import { EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { JhButton } from "../../../../core/ui/jh-button";
import { useRef, useState } from "react";
import { Transition, TransitionChild } from "@headlessui/react";
import { useOnClickOutside } from "usehooks-ts";
import { ControlButtons } from "./control-buttons";

interface TodoDetailModalProps extends BaseModalProps {
  handleClose: () => void;
  currentTodo: {
    currentColumn: ReadColumnDto;
    currentTodo: Todo;
  } | null;
}

export const TodoDetailModal: React.FC<TodoDetailModalProps> = ({
  modalProps: { isOpen },
  currentTodo,
  handleClose,
}) => {
  if (!currentTodo) {
    return null;
  }

  const [comment, setComment] = useState<string>("");

  return (
    <JhModal
      showButtons={false}
      isOpen={isOpen}
      className="w-full max-w-[730px]"
      closeButtonProps={{
        onClick: handleClose,
      }}
    >
      <div>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold">{currentTodo?.currentTodo.title}</p>
          <ControlButtons handleClose={handleClose} />
        </div>
        <div className="flex mt-6 ">
          <div className="w-3/4 max-w-[450px]  flex flex-col ">
            <DetailTags
              columnName={currentTodo.currentColumn.name}
              tags={currentTodo.currentTodo.tags}
            />
            <p className="mt-4 text-sm break-words">
              {currentTodo.currentTodo.content}
            </p>
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

            <div className="mt-6">
              <span>{"댓글"}</span>
              <form className="border border-neutral-200 rounded-lg mt-2 overflow-hidden flex relative">
                <textarea
                  value={comment}
                  className="w-full resize-y outline-none p-4 text-sm max-h-52 min-h-32 pr-20"
                  placeholder="댓글 작성하기"
                  onChange={(e) => setComment(e.target.value)}
                />
                <JhButton
                  variants="outline"
                  className="text-xs text-primary break-keep absolute right-4 bottom-4"
                >
                  {"입력"}
                </JhButton>
              </form>
            </div>
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
