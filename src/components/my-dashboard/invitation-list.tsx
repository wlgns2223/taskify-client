"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { queryOptions } from "../../libs/dashboard/query-options";
import { OffsetPaginationRequestDto } from "../../libs/dashboard/dto/offsetPagination.dto";
import { defaultOffsetPaginationReqDto } from "./dashboards";

export const InvitationList: React.FC<PropsWithChildren> = ({ children }) => {
  const [offsetPaginationDto, setOffsetPaginationDto] =
    useState<OffsetPaginationRequestDto>(defaultOffsetPaginationReqDto);
  const { data } = useSuspenseQuery({
    ...queryOptions.getInvitationsWithPagination(offsetPaginationDto),
  });

  return (
    <div className="flex px-6 py-8 bg-neutral-50 rounded-lg mt-11">
      <p className="font-bold text-2xl">{"초대받은 대시보드"}</p>
      <ul></ul>
    </div>
  );
};
