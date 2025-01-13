import { ToastContainer } from "react-toastify";
import { ModalHookProps } from "../../core/hooks/useModal";
import { JhModal } from "../../core/ui/modal/jh-modal";
import { useCreateDashboard } from "../../libs/dashboard/hooks/useCreateDashboard";
import { DashboardCreateContent } from "./dashboard-create-content";
import { useQueryClient } from "@tanstack/react-query";
import { queryOptions } from "../../libs/dashboard/query-options";
import { defaultOffsetPaginationReqDto } from "../../core/const/default-pagination";

interface DashboardCreateContentProps {
  modalHookProps: ModalHookProps;
}

export const DashboardCreateModal: React.FC<DashboardCreateContentProps> = ({
  modalHookProps,
}) => {
  const queryClient = useQueryClient();

  const refetchDashboards = () => {
    queryClient.invalidateQueries({
      queryKey: [
        ...queryOptions.readDashboards(defaultOffsetPaginationReqDto).queryKey,
      ],
    });
    queryClient.invalidateQueries({
      queryKey: [...queryOptions.all().queryKey],
    });
  };

  const {
    handleCreateDashboard,
    isPending,
    dashBoardCreateDto,
    setDashBoardCreateDto,
  } = useCreateDashboard({
    onSuccess: () => {
      modalHookProps.setIsOpen(false);
      refetchDashboards();
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
    </>
  );
};
