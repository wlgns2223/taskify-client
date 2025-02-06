import { Service } from "../../../../core/network/service";
import {
  CreateColumnDtoSchema,
  ReadColumnDto,
  UpdateColumnDtoSchema,
} from "../dto/columns.dto";
import { SwapColumnsDtoSchema } from "../dto/swapColumns.dto";

export type DelteColumnDto = {
  columnId: number;
  dashboardId: number;
};

class ColumnService extends Service {
  constructor() {
    super();
  }

  async create(createColumn: CreateColumnDtoSchema) {
    const res = await this.apiHandler.post<CreateColumnDtoSchema>(
      this.endPoints.columns.create(),
      createColumn
    );
    return res.data;
  }

  async findBy(dashboardId: number) {
    const res = await this.apiHandler.get<ReadColumnDto[]>(
      this.endPoints.columns.read(dashboardId)
    );
    return res.data;
  }

  async swapPosition(
    dashboardId: number,
    swapColumnsPosition: SwapColumnsDtoSchema
  ) {
    const res = await this.apiHandler.put<SwapColumnsDtoSchema>(
      this.endPoints.columns.swap(dashboardId),
      swapColumnsPosition
    );
    return res.data;
  }

  async update(id: number, newColumn: UpdateColumnDtoSchema) {
    const res = await this.apiHandler.put<UpdateColumnDtoSchema>(
      this.endPoints.columns.update(id),
      newColumn
    );
    return res.data;
  }

  async delete(columnId: number, dashboardId: number) {
    const res = await this.apiHandler.delete(
      this.endPoints.columns.delete(columnId, dashboardId)
    );
    return res.data;
  }
}

export const columnService = new ColumnService();
