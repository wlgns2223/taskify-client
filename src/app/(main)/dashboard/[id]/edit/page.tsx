import { NextPage } from "next";
import { GoBackButton } from "../../../../../components/edit/go-back-button";
import { DashboardUpdate } from "../../../../../components/edit/dashboard-update";

const Page: NextPage = () => {
  return (
    <div>
      <GoBackButton />
      <DashboardUpdate />
    </div>
  );
};
export default Page;
