import { z } from "zod";

const cursorSchema = z.object({
  next: z.union([z.number().int(), z.null()]),
  prev: z.union([z.number().int(), z.null()]),
});

export const readDashboardsDtoSchema = z.object({
  cursor: cursorSchema.nullable(),
  limit: z.number().int(),
  direction: z.enum(["next", "prev"]).default("next"),
});

export type ReadDashboardsDtoSchema = z.infer<typeof readDashboardsDtoSchema>;

export type Dashboard = {
  id: number;
  ownerId: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
};

export type ReadDashboardsResponse = {
  cursor: z.infer<typeof cursorSchema>;
  dashboards: Dashboard[];
  totalNumberOfData: number;
};
