"use client";

import { useModal } from "../../core/hooks/useModal";
import { DashboardCreateModal } from "./dashboard-create-modal";
import { PropsWithChildren, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { ModalOpenButton } from "./modal-open-button";

export const DashboardPannel: React.FC<PropsWithChildren> = ({ children }) => {
  const modalHookProps = useModal();

  const handleOpenModal = () => {
    modalHookProps.setIsOpen(true);
  };

  return (
    <>
      <div className="max-w-5xl">
        <div className="flex justify-end">
          <ModalOpenButton handleOpenModal={handleOpenModal} />
        </div>
        {children}
      </div>
      <DashboardCreateModal modalHookProps={modalHookProps} />
    </>
  );
};
