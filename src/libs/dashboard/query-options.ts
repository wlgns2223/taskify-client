import { dashboardService } from "./dashboard.service";
import {
  DeleteColumnDtoSchema,
  UpdateColumnDtoSchema,
} from "./dto/columns.dto";
import {
  OffsetPaginationRequestDto,
  ReadDashboardsDtoSchema,
} from "./dto/readDashboards.dto";

const queryKeys = {
  all: ["dashboards"] as const,
  columnsByDashboardId: (dashboardId: string) =>
    [...queryKeys.all, dashboardId] as const,
  todo: ["todos"] as const,
  todosByColumnId: (columnId: string) => [...queryKeys.todo, columnId] as const,
};

export const queryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: () => {},
  }),
  readDashboards: (offsetPaginationReqDto: OffsetPaginationRequestDto) => ({
    queryKey: [...queryKeys.all, offsetPaginationReqDto],
    queryFn: () => dashboardService.readDashboards(offsetPaginationReqDto),
  }),
  getColumnsBydashboardId: (id: string) => ({
    queryKey: [...queryKeys.columnsByDashboardId(id)],
    queryFn: () => dashboardService.getColumnsByDashboardId(id),
  }),
  updateColumn: () => ({
    queryFn: (column: UpdateColumnDtoSchema) =>
      dashboardService.updateColumn(column.id.toString(), column),
  }),
  deleteColumn: () => ({
    queryFn: (deleteColumnDto: DeleteColumnDtoSchema) =>
      dashboardService.useDeleteColumn(
        deleteColumnDto.id,
        deleteColumnDto.dashboardId
      ),
  }),
  getTodosByColumnId: (columnId: string) => ({
    queryKey: [...queryKeys.todosByColumnId(columnId)],
    queryFn: () => dashboardService.getTodosByColumnId(columnId),
  }),
};
