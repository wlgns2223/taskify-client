import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { OffsetPaginationRequestDto } from "../../dto/offsetPagination.dto";
import { todoQueryOptions } from "../services/query-key";

// pc일때에는 무한 스크롤
// pc 미만의 뷰포트일때에는 버튼을 클릭해서 더보기
// queryFn: context는 initialPageParam을 받아옴
// 후속 페이지의 경우 getNextPageParam을 통해 다음 페이지를 가져옴
export const useFetchTodoWithPagination = (
  columnId: number,
  offsetPaginationRequestDto: OffsetPaginationRequestDto
) => {
  return useSuspenseInfiniteQuery({
    queryKey: todoQueryOptions.findManyByPagination(
      columnId,
      offsetPaginationRequestDto
    ).queryKey,
    queryFn: (context) =>
      todoQueryOptions
        .findManyByPagination(columnId, context.pageParam)
        .queryFn(),
    getNextPageParam: (lastPage) => {
      const nextOffsetPaginationReqDto: OffsetPaginationRequestDto = {
        ...offsetPaginationRequestDto,
        page: lastPage.currentPage + 1,
      };
      return lastPage.hasNextPage ? nextOffsetPaginationReqDto : null;
    },
    initialPageParam: offsetPaginationRequestDto,
    select: (data) => {
      return data.pages.flatMap((page) => page.data);
    },
  });
};
