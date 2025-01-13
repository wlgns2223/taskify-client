import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
} from "react";
import { CreateTodoDto } from "../dto/createTodo.dto";

const TodoCreateContext = createContext({
  todo: {} as CreateTodoDto,
  setTodo: {} as Dispatch<SetStateAction<CreateTodoDto>>,
});

export const useTodoCreateContext = () => useContext(TodoCreateContext);

interface TodoProviderProps {
  todo: CreateTodoDto;
  setTodo: Dispatch<SetStateAction<CreateTodoDto>>;
}

export const TodoCreateProvider: React.FC<
  PropsWithChildren<TodoProviderProps>
> = ({ children, setTodo, todo }) => {
  return (
    <TodoCreateContext.Provider
      value={{
        todo,
        setTodo,
      }}
    >
      {children}
    </TodoCreateContext.Provider>
  );
};
