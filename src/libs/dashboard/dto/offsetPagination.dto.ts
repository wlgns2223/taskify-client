import { z } from "zod";

export const DEFAULT_PAGE_SIZE = 6;
export const offsetPaginationRequestDtoSchema = z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1).default(DEFAULT_PAGE_SIZE),
});
export interface OffsetPaginationRequestDto
  extends z.infer<typeof offsetPaginationRequestDtoSchema> {}

export interface InvitationOffsetPaginationRequestDto
  extends OffsetPaginationRequestDto {
  search?: string;
}

export type OffsetPaginationResponseDto<T> = {
  data: T[];
  currentPage: number;
  totalPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};
