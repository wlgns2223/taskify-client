import { EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { JhButton } from "../../../../core/ui/jh-button";
import { Transition, TransitionChild } from "@headlessui/react";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

interface ControlButtonsProps {
  handleClose: () => void;
}

export const ControlButtons: React.FC<ControlButtonsProps> = ({
  handleClose,
}) => {
  const [openKebab, setOpenKebab] = useState<boolean>(false);
  const kebabRef = useRef<HTMLButtonElement>(null);
  useOnClickOutside(kebabRef, () => setOpenKebab(false));
  return (
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
  );
};
