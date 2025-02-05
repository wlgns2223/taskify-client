import { useSuspenseQuery } from "@tanstack/react-query";
import { myDashboardQueryOptions } from "./query-key";
import { OffsetPaginationRequestDto } from "../../dashboard/dto/offsetPagination.dto";

export const useDashboardsWithPagination = (
  offsetPaginationReqDto: OffsetPaginationRequestDto
) => {
  return useSuspenseQuery({
    queryKey: myDashboardQueryOptions.findByPagination(offsetPaginationReqDto)
      .queryKey,
    queryFn: myDashboardQueryOptions.findByPagination(offsetPaginationReqDto)
      .queryFn,
  });
};
