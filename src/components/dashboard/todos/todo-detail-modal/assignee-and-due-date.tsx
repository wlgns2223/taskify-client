import dayjs from "dayjs";

interface AssigneeAndDueDateProps {
  assigneeNicname: string;
  dueDate: string;
}

export const AssigneeAndDueDate: React.FC<AssigneeAndDueDateProps> = ({
  assigneeNicname,
  dueDate,
}) => {
  return (
    <div className="ml-6 flex-1 border-2 border-neutral-200 rounded-md h-fit p-4 ">
      <div>
        <span className="text-xs font-semibold">{"담당자"}</span>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-8 h-8 rounded-full bg-green-400 flex justify-center items-center">
            <span className="text-neutral-50 font-semibold">
              {assigneeNicname[0]}
            </span>
          </div>
          <span className="text-sm">{assigneeNicname}</span>
        </div>
      </div>
      <div className="mt-5 flex flex-col">
        <span className="text-xs font-semibold">{"마감일"}</span>
        <span className="text-sm">{dayjs(dueDate).format("YYYY-MM-DD")}</span>
      </div>
    </div>
  );
};
