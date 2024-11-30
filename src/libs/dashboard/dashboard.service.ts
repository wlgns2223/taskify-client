import { Service } from "../../core/network/service";
import {
  CreateColumnDtoSchema,
  ReadColumnDto,
  UpdateColumnDtoSchema,
} from "./dto/columns.dto";
import {
  CreateDashBoardDtoSchema,
  createDashBoardDtoSchema,
} from "./dto/createDashboards.dto";
import {
  CreateInvitationDto,
  CreateInvitationDtoSchema,
} from "./dto/createInvitation.dto";
import {
  Dashboard,
  OffsetPaginationRequestDto,
  OffsetPaginationResponseDto,
  offsetPaginationRequestDtoSchema,
} from "./dto/readDashboards.dto";
import { SwapColumnsDtoSchema } from "./dto/swapColumns.dto";

class DashboardService extends Service {
  constructor() {
    super();
  }

  async createDashboard(createDashboardDto: CreateDashBoardDtoSchema) {
    const result = createDashBoardDtoSchema.safeParse(createDashboardDto);
    if (!result.success) {
      throw new Error(result.error.flatten().fieldErrors.title?.[0]);
    }

    const res = await this.apiHandler.post<CreateDashBoardDtoSchema>(
      this.endPoints.dashboard.create(),
      createDashboardDto
    );
    return res.data;
  }

  async readDashboards(offsetPaginationReqDto: OffsetPaginationRequestDto) {
    const result = offsetPaginationRequestDtoSchema.safeParse(
      offsetPaginationReqDto
    );
    if (!result.success) {
      throw new Error(result.error.message);
    }

    const res = await this.apiHandler.get<
      OffsetPaginationResponseDto<Dashboard>
    >(this.endPoints.dashboard.read(offsetPaginationReqDto));
    return res.data;
  }

  async getDashboardById(id: string) {
    const res = await this.apiHandler.get<Dashboard>(
      this.endPoints.dashboard.getByDashboardId(id)
    );
    return res.data;
  }

  async getColumnsByDashboardId(id: string) {
    const res = await this.apiHandler.get<ReadColumnDto[]>(
      this.endPoints.columns.read(id)
    );
    return res.data;
  }

  async swapColumnsPosition(
    dashboardId: string,
    swapColumnsPosition: SwapColumnsDtoSchema
  ) {
    const res = await this.apiHandler.put<SwapColumnsDtoSchema>(
      this.endPoints.columns.swap(dashboardId),
      swapColumnsPosition
    );
    return res.data;
  }

  async createColumn(createColumn: CreateColumnDtoSchema) {
    const res = await this.apiHandler.post<CreateColumnDtoSchema>(
      this.endPoints.columns.create(),
      createColumn
    );
    return res.data;
  }

  async updateColumn(id: string, newColumn: UpdateColumnDtoSchema) {
    const res = await this.apiHandler.put<UpdateColumnDtoSchema>(
      this.endPoints.columns.update(id),
      newColumn
    );
    return res.data;
  }

  async useDeleteColumn(columnId: number, dashboardId: number) {
    const res = await this.apiHandler.delete(
      this.endPoints.columns.delete(columnId, dashboardId)
    );
    return res.data;
  }

  async getTodosByColumnId(columnId: string) {
    const res = await this.apiHandler.get(this.endPoints.todos.read(columnId));
    return res.data;
  }

  async createInvitation(createInvitationDto: CreateInvitationDto) {
    const result = CreateInvitationDtoSchema.safeParse(createInvitationDto);
    if (!result.success) {
      throw new Error(result.error.flatten().fieldErrors.dashboardId?.[0]);
    }

    const res = await this.apiHandler.post<CreateInvitationDto>(
      this.endPoints.invitation.create(),
      createInvitationDto
    );
    return res.data;
  }
}

export const dashboardService = new DashboardService();
