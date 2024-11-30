import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { OffsetPaginationRequestDto } from "../../../libs/dashboard/dto/readDashboards.dto";
import { queryOptions } from "../../../libs/dashboard/query-options";
import { defaultOffsetPaginationReqDto } from "../../../components/my-dashboard/dashboards";

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
