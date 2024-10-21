import { END_POINT } from "../../core/network/end-point";
import { apiHandler } from "../../core/network/fetch";
import {
  CreateDashBoardDtoSchema,
  createDashBoardDtoSchema,
} from "./dto/createDashboards.dto";
import {
  ReadDashboardsDtoSchema,
  readDashboardsDtoSchema,
} from "./dto/readDashboards.dto";

export const createDashBoard = async (
  createDashboardDto: CreateDashBoardDtoSchema
) => {
  const result = createDashBoardDtoSchema.safeParse(createDashboardDto);
  if (!result.success) {
    throw new Error(result.error.flatten().fieldErrors.title?.[0]);
  }

  const res = await apiHandler.post<CreateDashBoardDtoSchema>(
    END_POINT.dashboard(),
    createDashboardDto
  );
  return res.data;
};

export const readDashboards = async (
  readDashboardDto: ReadDashboardsDtoSchema
) => {
  const result = readDashboardsDtoSchema.safeParse(readDashboardDto);
  if (!result.success) {
    console.log(result.error);
    throw new Error(result.error.message);
  }

  const res = await apiHandler.get(END_POINT.dashboard(readDashboardDto));
  return res.data;
};
