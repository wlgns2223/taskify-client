import { useTodoCreateContext } from "../../../../libs/dashboard/todo/todo-create-context";
import dayjs from "dayjs";
import { useToast } from "../../../../core/hooks/useToast";
import { JHInput } from "../../../../core/ui/jh-input";

export const TodoCreateDatePicker: React.FC = () => {
  const { setTodo, todo } = useTodoCreateContext();
  const { notify } = useToast();

  const format = "YYYY-MM-DD";

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isBefore = dayjs(e.target.value).isBefore(dayjs().format(format));
    if (isBefore) {
      notify("오늘 이후로 선택해주세요");
      return;
    }

    setTodo((prev) => ({ ...prev, dueDate: dayjs(e.target.value).toString() }));
  };
  return (
    <div className="flex flex-col">
      <span>{"마감일"}</span>
      <JHInput
        value={dayjs(todo.dueDate).format(format)}
        onChange={handleDateChange}
        type="date"
      />
    </div>
  );
};
