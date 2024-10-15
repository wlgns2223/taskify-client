import { useState } from "react";

export type ModalHookProps = ReturnType<typeof useModal>;
export const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return { isOpen, setIsOpen };
};
