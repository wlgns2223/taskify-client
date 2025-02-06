import { Service } from "../../core/network/service";

import {
  CreateDashBoardDtoSchema,
  createDashBoardDtoSchema,
} from "./dto/createDashboards.dto";

import {
  OffsetPaginationRequestDto,
  OffsetPaginationResponseDto,
  offsetPaginationRequestDtoSchema,
} from "./dto/offsetPagination.dto";
import { Dashboard } from "./dto/readDashboards.dto";

class DashboardService extends Service {
  constructor() {
    super();
  }

  async create(createDashboardDto: CreateDashBoardDtoSchema) {
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

  async findByPagination(offsetPaginationReqDto: OffsetPaginationRequestDto) {
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

  async findById(id: string) {
    const res = await this.apiHandler.get<Dashboard>(
      this.endPoints.dashboard.getByDashboardId(id)
    );
    return res.data;
  }
}

export const dashboardService = new DashboardService();
