import { number, z } from "zod";
import { Dashboard } from "../../dto/readDashboards.dto";

export const swapColumnsDtoSchema = z.object({
  from: z.number().int(),
  to: z.number().int(),
});

export type SwapColumnsDtoSchema = z.infer<typeof swapColumnsDtoSchema>;
