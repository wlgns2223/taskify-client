import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { JhButton } from "../../core/ui/jh-button";
import {
  Dashboard,
  OffsetPaginationRequestDto,
  OffsetPaginationResponseDto,
  ReadDashboardsDtoSchema,
  ReadDashboardsResponse,
} from "../../libs/dashboard/dto/readDashboards.dto";
import { off } from "process";

export const PAGE_SIZE = {
  first: 5,
  others: 6,
};

interface DashboardPagesNumberProps {
  setOffsetPaginationReqDto: Dispatch<
    SetStateAction<OffsetPaginationRequestDto>
  >;
  offsetPaginationReqDto: OffsetPaginationRequestDto;
  offsetPaginationResponse: OffsetPaginationResponseDto<Dashboard>;
}

export const DashboardPagesNumber: React.FC<DashboardPagesNumberProps> = ({
  setOffsetPaginationReqDto,
  offsetPaginationReqDto,
  offsetPaginationResponse,
}) => {
  const handleNext = () => {
    if (
      offsetPaginationResponse.currentPage ===
      offsetPaginationResponse.totalPage
    )
      return;
    setOffsetPaginationReqDto({
      ...offsetPaginationReqDto,
      page: offsetPaginationResponse.currentPage + 1,
    });
  };

  const handlePrev = () => {
    if (offsetPaginationResponse.currentPage === 1) return;
    setOffsetPaginationReqDto({
      ...offsetPaginationReqDto,
      page: offsetPaginationResponse.currentPage - 1,
    });
  };

  return (
    <div className="flex items-center justify-end mt-3">
      <p>{`${offsetPaginationResponse.currentPage} 페이지 중 ${offsetPaginationResponse.totalPage}`}</p>
      <div className="ml-4 flex">
        <JhButton
          variants="outline"
          className="border border-neutral-200 bg-white w-10 h-10 flex justify-center items-center"
          disabled={!offsetPaginationResponse.hasPrevPage}
          onClick={handlePrev}
        >
          {"<"}
        </JhButton>
        <JhButton
          onClick={handleNext}
          variants="outline"
          className="border border-neutral-200 bg-white w-10 h-10 flex justify-center items-center"
          disabled={!offsetPaginationResponse.hasNextPage}
        >
          {">"}
        </JhButton>
      </div>
    </div>
  );
};
