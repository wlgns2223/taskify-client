import { OffsetPaginationRequestDto } from "../../dto/offsetPagination.dto";
import { todoService } from "./todo.service";

const todoQueryKey = {
  todo: ["todos"] as const,
  findManyBy: (columnId: number) => [...todoQueryKey.todo, columnId] as const,
  findManyByPagination: (
    columndId: number,
    offsetPaginationRequestDto: OffsetPaginationRequestDto
  ) => [...todoQueryKey.todo, columndId, offsetPaginationRequestDto] as const,
};

export const todoQueryOptions = {
  findManyBy: (columnId: number) => ({
    queryKey: todoQueryKey.findManyBy(columnId),
    queryFn: () => todoService.findManyBy(columnId),
  }),
  findManyByPagination: (
    columnId: number,
    offsetPaginationRequestDto: OffsetPaginationRequestDto
  ) => ({
    queryKey: todoQueryKey.findManyByPagination(
      columnId,
      offsetPaginationRequestDto
    ),
    queryFn: () =>
      todoService.findManyByPagination(columnId, offsetPaginationRequestDto),
  }),
};
