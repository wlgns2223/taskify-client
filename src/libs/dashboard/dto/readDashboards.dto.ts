import { z } from "zod";
import page from "../../../app/(main)/mydashboard/page";

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

export const DEFAULT_PAGE_SIZE = 6;
export const offsetPaginationRequestDtoSchema = z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1).default(DEFAULT_PAGE_SIZE),
});
export type OffsetPaginationRequestDto = z.infer<
  typeof offsetPaginationRequestDtoSchema
>;
export type OffsetPaginationResponseDto<T> = {
  data: T[];
  currentPage: number;
  totalPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};
