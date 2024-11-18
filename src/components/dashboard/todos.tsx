interface TodosProps {
  columnId: number;
}

export const Todos: React.FC<TodosProps> = ({ columnId }) => {
  return <ul>{columnId}</ul>;
};
