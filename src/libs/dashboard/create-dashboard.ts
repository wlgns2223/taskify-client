import { END_POINT } from "../../core/network/end-point";
import { apiHandler } from "../../core/network/fetch";
import {
  CreateDashBoardDtoSchema,
  createDashBoardDtoSchema,
} from "./createDashBoardDto";

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
  console.log(res.data);
};
