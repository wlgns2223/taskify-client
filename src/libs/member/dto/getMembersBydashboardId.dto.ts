import { z } from "zod";

export const GetMembersByDashboardIdDto = z.number().int();
export type GetMembersByDashboardIdDto = z.infer<
  typeof GetMembersByDashboardIdDto
>;
