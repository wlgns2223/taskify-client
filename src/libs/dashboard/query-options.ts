import { dashboardService } from "./dashboard.service";
import { ReadDashboardsDtoSchema } from "./dto/readDashboards.dto";

const queryKeys = {
  all: ["dashboards"] as const,
  columnsByDashboardId: (dashboardId: string) =>
    [...queryKeys.all, dashboardId] as const,
};

export const queryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: () => {},
  }),
  readDashboards: (readDashboardDto: ReadDashboardsDtoSchema) => ({
    queryKey: [...queryKeys.all, readDashboardDto],
    queryFn: () => dashboardService.readDashboards(readDashboardDto),
  }),
  getColumnsBydashboardId: (id: string) => ({
    queryKey: [...queryKeys.columnsByDashboardId(id)],
    queryFn: () => dashboardService.getColumnsByDashboardId(id),
  }),
};
