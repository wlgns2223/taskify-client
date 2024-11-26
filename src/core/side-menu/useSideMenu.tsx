import {
  useInfiniteQuery,
  useQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import {
  ReadDashboardsDtoSchema,
  ReadDashboardsResponse,
} from "../../libs/dashboard/dto/readDashboards.dto";
import { defaultReadDashboardsDto } from "../../components/my-dashboard/dashboards";
import { queryOptions } from "../../libs/dashboard/query-options";

export const useSideMenu = () => {
  return useSuspenseInfiniteQuery({
    queryKey: queryOptions.all().queryKey,
    queryFn: (context) => {
      const infiniteReadDto: ReadDashboardsDtoSchema = {
        ...defaultReadDashboardsDto,
        cursor: {
          next: context.pageParam,
          prev: null,
        },
      };

      return queryOptions.readDashboards(infiniteReadDto).queryFn();
    },
    getNextPageParam: (lastPage) => {
      const res = lastPage as ReadDashboardsResponse;
      return res.cursor.next;
    },
    initialPageParam: defaultReadDashboardsDto.cursor?.next ?? null,
    select: (data) => {
      return data.pages.flatMap((page) => page.dashboards);
    },
  });
};
