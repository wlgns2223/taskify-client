"use client";

import { PropsWithChildren, useState } from "react";
import { InvitationOffsetPaginationRequestDto } from "../../libs/dashboard/dto/offsetPagination.dto";
import { defaultOffsetPaginationReqDto } from "../../core/const/default-pagination";
import { EmptyBoard } from "./empty-board";
import { InvitationPendingList } from "./invitation-pending-list";
import { PaginationButtons } from "./dashboard-pages-number";
import { InvitationSchema } from "../../libs/dashboard/dto/invitations.dto";
import { useInvitationWithPagination } from "../../libs/my-dashboard/invitation/services/useInvitationServices";

export const InvitationList: React.FC<PropsWithChildren> = ({ children }) => {
  const [offsetPaginationDto, setOffsetPaginationDto] =
    useState<InvitationOffsetPaginationRequestDto>({
      ...defaultOffsetPaginationReqDto,
      search: "",
    });

  const { data: invitationsWithPagination } =
    useInvitationWithPagination(offsetPaginationDto);

  return invitationsWithPagination.data.length > 0 ? (
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
  ) : (
    <EmptyBoard />
  );
};
