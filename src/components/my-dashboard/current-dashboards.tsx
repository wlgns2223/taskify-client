"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { useModal } from "../../core/hooks/useModal";
import { JhButton } from "../../core/ui/jh-button";
import { DashboardCreateModal } from "./dashboard-create-modal";
import { Suspense } from "react";
import { Dashboards } from "./dashboards";
import { ToastContainer } from "react-toastify";

export const CurrentDashboards: React.FC = () => {
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
        <Suspense
          fallback={<div className="min-h-[152px] mt-3">{"...loading"}</div>}
        >
          <Dashboards />
        </Suspense>
      </div>
      <DashboardCreateModal modalHookProps={modalHookProps} />
      <ToastContainer />
    </>
  );
};

const ModalOpenButton: React.FC<{ handleOpenModal: () => void }> = ({
  handleOpenModal,
}) => (
  <JhButton
    className="flex justify-center items-center border-neutral-200 bg-white w-full max-w-[330px] h-[70px]"
    variants="outline"
    onClick={handleOpenModal}
  >
    <p>{"새로운 대시보드"}</p>
    <PlusIcon className="w-4 h-4 text-primary bg-primary-light rounded-sm ml-3" />
  </JhButton>
);
