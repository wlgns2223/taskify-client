import { UndefinedInitialDataOptions } from "@tanstack/react-query";
import { dashboardService } from "./dashboard.service";
import { ReadDashboardsDtoSchema } from "./dto/readDashboards.dto";
import { useState } from "react";

const queryKeys = {
  all: ["dashboards"] as const,
};

export const queryOptions = {
  readDashboards: (readDashboardDto: ReadDashboardsDtoSchema) => ({
    queryKey: [...queryKeys.all, readDashboardDto],
    queryFn: () => dashboardService.readDashboards(readDashboardDto),
  }),
};
