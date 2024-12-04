"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { queryOptions } from "../../libs/dashboard/query-options";
import {
  InvitationOffsetPaginationRequestDto,
  OffsetPaginationRequestDto,
} from "../../libs/dashboard/dto/offsetPagination.dto";
import { defaultOffsetPaginationReqDto } from "../../core/const/default-pagination";
import { match } from "ts-pattern";
import { EmptyBoard } from "./empty-board";
import { InvitationPendingList } from "./invitation-pending-list";
import { PaginationButtons } from "./dashboard-pages-number";
import { InvitationSchema } from "../../libs/dashboard/dto/invitations.dto";

export const InvitationList: React.FC<PropsWithChildren> = ({ children }) => {
  const [offsetPaginationDto, setOffsetPaginationDto] =
    useState<InvitationOffsetPaginationRequestDto>(
      defaultOffsetPaginationReqDto
    );
  const { data: invitationsWithPagination } = useSuspenseQuery({
    ...queryOptions.getInvitationsWithPagination(offsetPaginationDto),
  });

  return match(invitationsWithPagination.data.length)
    .with(0, () => <EmptyBoard />)
    .otherwise(() => (
      <div>
        <InvitationPendingList
          offsetPaginationDto={offsetPaginationDto}
          setOffsetPaginationDto={setOffsetPaginationDto}
          invitationsWithPagination={invitationsWithPagination}
        />
        <PaginationButtons<InvitationSchema>
          offsetPaginationReqDto={offsetPaginationDto}
          setOffsetPaginationReqDto={setOffsetPaginationDto}
          offsetPaginationResponse={invitationsWithPagination}
        />
      </div>
    ));
};
