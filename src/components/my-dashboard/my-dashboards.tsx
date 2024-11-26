import { useModal } from "../../core/hooks/useModal";
import { DashboardCreateModal } from "./dashboard-create-modal";
import { Suspense } from "react";
import { Dashboards } from "./dashboards";
import { ToastContainer } from "react-toastify";
import { ModalOpenButton } from "./modal-open-button";
import { DashboardPannel } from "./dashboard-pannel";

export const MyDashboards: React.FC = () => {
  return <DashboardPannel></DashboardPannel>;
};
