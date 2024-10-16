import { z } from "zod";
import { colors } from "../../components/my-dashboard/dashboard-create-content";

export const createDashBoardDtoSchema = z.object({
  title: z
    .string()
    .min(1, { message: "대시보드 제목은 1글자 이상이어야 합니다." }),
  color: z.string().default(colors[0].hex),
});

export type CreateDashBoardDtoSchema = z.infer<typeof createDashBoardDtoSchema>;
