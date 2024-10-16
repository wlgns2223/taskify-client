import { EmptyBoard } from "../../../components/my-dashboard/empty-board";
import { PropsWithChildren } from "react";
import { DashboardCreateModal } from "../../../components/my-dashboard/dashboard-create-modal";

const MyDashBoard: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      {children}
      <EmptyBoard />
    </div>
  );
};
export default () => (
  <MyDashBoard>
    <DashboardCreateModal />
  </MyDashBoard>
);
