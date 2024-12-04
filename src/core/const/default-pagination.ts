import {
  DEFAULT_PAGE_SIZE,
  OffsetPaginationRequestDto,
} from "../../libs/dashboard/dto/offsetPagination.dto";

export const defaultOffsetPaginationReqDto: OffsetPaginationRequestDto = {
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
};
