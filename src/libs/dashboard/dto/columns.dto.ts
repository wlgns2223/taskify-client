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

const CreateColumnDto = Column.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateColumnDtoSchema = z.infer<typeof CreateColumnDto>;
