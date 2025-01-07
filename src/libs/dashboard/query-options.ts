import { dashboardService } from "./dashboard.service";
import {
  DeleteColumnDtoSchema,
  UpdateColumnDtoSchema,
} from "./dto/columns.dto";
import { InvitationStatusEnum } from "./dto/invitations.dto";
import { OffsetPaginationRequestDto } from "./dto/offsetPagination.dto";
import { ReadDashboardsDtoSchema } from "./dto/readDashboards.dto";

const queryKeys = {
  all: ["dashboards"] as const,
  columnsByDashboardId: (dashboardId: string) =>
    [...queryKeys.all, dashboardId] as const,
  todo: ["todos"] as const,
  todosByColumnId: (columnId: string) => [...queryKeys.todo, columnId] as const,
  invitation: ["invitations"] as const,
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
  getDashboardById: (id: string) => ({
    queryKey: [...queryKeys.all, id],
    queryFn: () => dashboardService.getDashboardById(id),
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

  getInvitationsWithPagination: (
    offsetPaginationReqDto: OffsetPaginationRequestDto
  ) => ({
    queryKey: [...queryKeys.invitation, offsetPaginationReqDto],
    queryFn: () =>
      dashboardService.getInvitationsWithPagination(offsetPaginationReqDto),
  }),

  updateInvitationStatus: () => ({
    queryFn: (param: { invitationId: number; status: InvitationStatusEnum }) =>
      dashboardService.updateInvitationStatus(param.invitationId, param.status),
  }),
};
