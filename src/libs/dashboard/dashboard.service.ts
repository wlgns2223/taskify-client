import { Service } from "../../core/network/service";
import {
  CreateDashBoardDtoSchema,
  createDashBoardDtoSchema,
} from "./dto/createDashboards.dto";
import {
  ReadDashboardsDtoSchema,
  ReadDashboardsResponse,
  readDashboardsDtoSchema,
} from "./dto/readDashboards.dto";

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
      this.endPoints.dashboard(),
      createDashboardDto
    );
    return res.data;
  }

  async readDashboards(readDashboardDto: ReadDashboardsDtoSchema) {
    const result = readDashboardsDtoSchema.safeParse(readDashboardDto);
    if (!result.success) {
      throw new Error(result.error.message);
    }

    const res = await this.apiHandler.get<ReadDashboardsResponse>(
      this.endPoints.dashboard(readDashboardDto)
    );
    return res.data;
  }
}

export const dashboardService = new DashboardService();
