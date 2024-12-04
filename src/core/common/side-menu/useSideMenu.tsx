import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { queryOptions } from "../../../libs/dashboard/query-options";
import { OffsetPaginationRequestDto } from "../../../libs/dashboard/dto/offsetPagination.dto";
import { defaultOffsetPaginationReqDto } from "../../const/default-pagination";

export const useSideMenu = () => {
  return useSuspenseInfiniteQuery({
    queryKey: queryOptions.all().queryKey,
    queryFn: (context) =>
      queryOptions.readDashboards(context.pageParam).queryFn(),
    getNextPageParam: (lastPage) => {
      const nextOffsetPaginationReqDto: OffsetPaginationRequestDto = {
        ...defaultOffsetPaginationReqDto,
        page: lastPage.currentPage + 1,
      };
      return lastPage.hasNextPage ? nextOffsetPaginationReqDto : null;
    },
    initialPageParam: defaultOffsetPaginationReqDto,
    select: (data) => {
      return data.pages.flatMap((page) => page.data);
    },
  });
};
