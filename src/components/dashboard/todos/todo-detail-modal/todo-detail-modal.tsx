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

  const [openKebab, setOpenKebab] = useState<boolean>(false);
  const kebabRef = useRef<HTMLButtonElement>(null);
  useOnClickOutside(kebabRef, () => setOpenKebab(false));

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
          <div className="flex items-center gap-x-6 relative">
            <JhButton
              ref={kebabRef}
              variants="reset"
              className="hover:border-neutral-400 border border-white rounded-md transition-all "
              onClick={() => setOpenKebab((prev) => !prev)}
            >
              <EllipsisVerticalIcon className="w-7 h-7" />
            </JhButton>

            <JhButton
              variants="reset"
              onClick={handleClose}
              className="hover:border-neutral-400 border border-white rounded-md transition-all"
            >
              <XMarkIcon className="w-7 h-7" />
            </JhButton>
            <Transition show={openKebab}>
              <TransitionChild
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 "
                enterTo="opacity-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0 "
              >
                <div className="p-1 flex flex-col bg-white rounded-md overflow-hidden border-2 border-neutral-200 shadow-lg absolute right-16 top-8 z-10 gap-y-2 break-keep">
                  <JhButton
                    className="text-sm px-4 py-1 hover:bg-primary-light hover:text-primary rounded-md "
                    variants="reset"
                  >
                    {"수정하기"}
                  </JhButton>
                  <JhButton
                    className="text-sm px-4 py-1 hover:bg-primary-light hover:text-primary rounded-md"
                    variants="reset"
                  >
                    {"삭제하기"}
                  </JhButton>
                </div>
              </TransitionChild>
            </Transition>
          </div>
        </div>
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
