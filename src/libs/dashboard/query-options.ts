import { dashboardService } from "./dashboard.service";
import {
  DeleteColumnDtoSchema,
  UpdateColumnDtoSchema,
} from "./column/dto/columns.dto";
import { InvitationStatusEnum } from "./dto/invitations.dto";
import { OffsetPaginationRequestDto } from "./dto/offsetPagination.dto";

const queryKeys = {
  all: ["dashboards"] as const,
  columnsByDashboardId: (dashboardId: string) =>
    [...queryKeys.all, dashboardId] as const,

  invitation: ["invitations"] as const,
};

export const queryOptions = {
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
