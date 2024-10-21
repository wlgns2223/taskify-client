"use client";

import { ToastContainer } from "react-toastify";
import { ModalHookProps } from "../../core/hooks/useModal";
import { JhModal } from "../../core/ui/modal/jh-modal";
import { useCreateDashboard } from "../../libs/dashboard/useCreateDashboard";
import { DashboardCreateContent } from "./dashboard-create-content";

interface DashboardCreateContentProps {
  modalHookProps: ModalHookProps;
}

export const DashboardCreateModal: React.FC<DashboardCreateContentProps> = ({
  modalHookProps,
}) => {
  const {
    handleCreateDashboard,
    isPending,
    dashBoardCreateDto,
    setDashBoardCreateDto,
  } = useCreateDashboard({
    onSuccess: () => {
      modalHookProps.setIsOpen(false);
    },
  });
  return (
    <>
      <JhModal
        className="w-full max-w-[540px]"
        isOpen={modalHookProps.isOpen}
        closeButtonProps={{
          onClick: () => modalHookProps.setIsOpen(false),
        }}
        confirmText="생성"
        confirmButtonProps={{
          onClick: () => {
            handleCreateDashboard();
          },
          loading: isPending,
        }}
      >
        <DashboardCreateContent
          dashboardCreateDto={dashBoardCreateDto}
          setDashBoardCreateDto={setDashBoardCreateDto}
        />
      </JhModal>
      <ToastContainer />
    </>
  );
};
