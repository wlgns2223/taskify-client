import { NextPage } from "next";

type PageProps = {
  params: {
    id: string;
  };
};

const Dashboard: NextPage<PageProps> = ({ params }) => {
  console.log(params.id);
  return null;
};

export default Dashboard;
