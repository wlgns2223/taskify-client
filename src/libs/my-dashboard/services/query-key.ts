import { dashboardService } from "../../dashboard/dashboard.service";
import { OffsetPaginationRequestDto } from "../../dashboard/dto/offsetPagination.dto";

const myDashboardQueryKey = {
  all: () => ["dashboards"] as const,
  findByPagination: (offsetPaginationReqDto: OffsetPaginationRequestDto) =>
    [...myDashboardQueryKey.all(), offsetPaginationReqDto] as const,
  findById: (id: string) => [...myDashboardQueryKey.all(), id] as const,
};

export const myDashboardQueryOptions = {
  all: () => ({
    queryKey: myDashboardQueryKey.all(),
    queryFn: () => {},
  }),
  findByPagination: (offsetPaginationReqDto: OffsetPaginationRequestDto) => ({
    queryKey: myDashboardQueryKey.findByPagination(offsetPaginationReqDto),
    queryFn: () => dashboardService.findByPagination(offsetPaginationReqDto),
  }),
  findById: (id: string) => ({
    queryKey: myDashboardQueryKey.findById(id),
    queryFn: () => dashboardService.findById(id),
  }),
};
