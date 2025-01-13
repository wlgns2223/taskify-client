import { ToastContainer } from "react-toastify";
import { useTodoCreateContext } from "../../../libs/dashboard/todo-create-context";
import dayjs from "dayjs";
import { useToast } from "../../../core/hooks/useToast";
import { JHInput } from "../../../core/ui/jh-input";

export const TodoCreateDatePicker: React.FC = () => {
  const { setTodo, todo } = useTodoCreateContext();
  const { notify } = useToast();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isBefore = dayjs(e.target.value).isBefore(
      dayjs().format("YYYY-MM-DD")
    );
    if (isBefore) {
      notify("오늘 이후로 선택해주세요");
      return;
    }

    setTodo((prev) => ({ ...prev, dueDate: e.target.value }));
  };

  return (
    <div className="flex flex-col">
      <span>{"마감일"}</span>
      <JHInput value={todo.dueDate} onChange={handleDateChange} type="date" />
    </div>
  );
};
