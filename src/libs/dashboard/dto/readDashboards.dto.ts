import { z } from "zod";

export const readDashboardsDtoSchema = z.object({
  cursor: z
    .string()
    .trim()
    .min(1, { message: "cursor는 1글자 이상이어야 합니다." }),
  limit: z.number().int().positive().default(6),
  direction: z.enum(["next", "prev"]).default("next"),
});

export type ReadDashboardsDtoSchema = z.infer<typeof readDashboardsDtoSchema>;
