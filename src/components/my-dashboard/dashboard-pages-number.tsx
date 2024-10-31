import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { JhButton } from "../../core/ui/jh-button";
import {
  ReadDashboardsDtoSchema,
  ReadDashboardsResponse,
} from "../../libs/dashboard/dto/readDashboards.dto";

export const PAGE_SIZE = {
  first: 5,
  others: 6,
};

interface DashboardPagesNumberProps {
  setReadDashboardsDto: Dispatch<SetStateAction<ReadDashboardsDtoSchema>>;
  readDashboardResponse: ReadDashboardsResponse;
  readDashboardsDto: ReadDashboardsDtoSchema;
}

export const DashboardPagesNumber: React.FC<DashboardPagesNumberProps> = ({
  readDashboardResponse,
  setReadDashboardsDto,
  readDashboardsDto,
}) => {
  const handleNext = () => {
    if (readDashboardResponse.cursor.next === null) return;
    setReadDashboardsDto((prev) => ({
      ...prev,
      cursor: readDashboardResponse.cursor,
      direction: "next",
    }));
  };

  const handlePrev = () => {
    if (readDashboardResponse.cursor.prev === null) return;
    setReadDashboardsDto((prev) => ({
      ...prev,
      cursor: readDashboardResponse.cursor,
      direction: "prev",
    }));
  };

  return (
    <div className="flex items-center justify-end mt-3">
      {/* <p>{"1 페이지 중 1"}</p> */}
      <div className="ml-4 flex">
        <JhButton
          variants="outline"
          className="border border-neutral-200 bg-white w-10 h-10 flex justify-center items-center"
          disabled={readDashboardResponse.cursor.prev === null}
          onClick={handlePrev}
        >
          {"<"}
        </JhButton>
        <JhButton
          onClick={handleNext}
          variants="outline"
          className="border border-neutral-200 bg-white w-10 h-10 flex justify-center items-center"
          disabled={readDashboardResponse.cursor.next === null}
        >
          {">"}
        </JhButton>
      </div>
    </div>
  );
};
