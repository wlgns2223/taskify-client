import { JhButton } from "../../core/ui/jh-button";
import { Cog6ToothIcon, PlusIcon } from "@heroicons/react/24/outline";
import { ReadColumnDto } from "../../libs/dashboard/dto/columns.dto";

interface ColumnProps {
  column: ReadColumnDto;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-primary rounded-full" />
          <span className="ml-2 text-lg font-bold">
            {column.name + " " + column.position}
          </span>
          <span className="flex justify-center items-center p-1 bg-neutral-200 text-sm rounded-[4px] text-neutral-700 w-5 h-5 ml-3  ">
            {"3"}
          </span>
        </div>
        <JhButton variants="reset" className="p-2">
          <Cog6ToothIcon className="w-6 h-6 text-neutral-700" />
        </JhButton>
      </div>
      <JhButton
        className="flex justify-center items-center border-neutral-200 bg-white w-full max-w-[330px] whitespace-nowrap mt-5"
        variants="outline"
      >
        <PlusIcon className="w-4 h-4 text-primary bg-primary-light rounded-sm ml-3" />
      </JhButton>
    </div>
  );
};
export default Column;
