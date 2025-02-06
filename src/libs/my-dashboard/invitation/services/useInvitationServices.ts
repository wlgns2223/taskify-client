import { useSuspenseQuery } from "@tanstack/react-query";
import { invitationQueryOptions } from "./query-key";
import { InvitationOffsetPaginationRequestDto } from "../../../dashboard/dto/offsetPagination.dto";

export const useInvitationWithPagination = (
  offsetPaginationDto: InvitationOffsetPaginationRequestDto
) => {
  return useSuspenseQuery({
    ...invitationQueryOptions.findByPagination(offsetPaginationDto),
  });
};
