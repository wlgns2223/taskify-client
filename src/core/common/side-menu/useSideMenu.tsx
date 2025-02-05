import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { OffsetPaginationRequestDto } from "../../../libs/dashboard/dto/offsetPagination.dto";
import { defaultOffsetPaginationReqDto } from "../../const/default-pagination";
import { myDashboardQueryOptions } from "../../../libs/my-dashboard/services/query-key";

export const useSideMenu = () => {
  return useSuspenseInfiniteQuery({
    queryKey: myDashboardQueryOptions.all().queryKey,
    queryFn: (context) => {
      return myDashboardQueryOptions
        .findByPagination(context.pageParam)
        .queryFn();
    },
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
