import { useQueries } from "@tanstack/react-query";
import { todoQueryOptions } from "../services/query-key";

export const useFetchAllTodosOfAllColumns = ({
  columnIds,
}: {
  columnIds: number[];
}) => {
  const todos = useQueries({
    queries: columnIds.map((id) => ({
      ...todoQueryOptions.findManyBy(id),
    })),
  });

  const todoMap = columnIds.reduce((acc, id, idx) => {
    acc.set(id, todos[idx]);

    return acc;
  }, new Map());

  return {
    todoMap,
  };
};
