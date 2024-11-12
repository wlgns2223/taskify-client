import { z } from "zod";

const Column = z.object({
  id: z.number().int(),
  dashboardId: z.number().int(),
  name: z.string(),
  position: z.number().int(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ReadColumnDto = z.infer<typeof Column>;
