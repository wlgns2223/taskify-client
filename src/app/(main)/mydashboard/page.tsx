import { PlusIcon } from "@heroicons/react/24/outline";
import { JhButton } from "../../../core/ui/jh-button";
import { EmptyBoard } from "../../../components/my-dashboard/empty-board";

const MyDashBoard: React.FC = () => {
  return (
    <div>
      <JhButton
        className="flex justify-center items-center border-neutral-200 bg-white w-full max-w-[330px] h-[70px]"
        variants="outline"
      >
        <p>{"새로운 대시보드"}</p>
        <PlusIcon className="w-4 h-4 text-primary bg-primary-light rounded-sm ml-3" />
      </JhButton>
      <EmptyBoard />
    </div>
  );
};
export default MyDashBoard;
