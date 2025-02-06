import { columnService } from "./service";

const columnQueryKey = {
  all: ["columns"] as const,
  findBy: (dashboardId: number) =>
    [...columnQueryKey.all, dashboardId] as const,
};

export const columnQueryOptions = {
  findBy: (dashboardId: number) => ({
    queryKey: columnQueryKey.findBy(dashboardId),
    queryFn: () => columnService.findBy(dashboardId),
  }),
};
