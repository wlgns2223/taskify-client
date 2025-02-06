import { InvitationOffsetPaginationRequestDto } from "../../../dashboard/dto/offsetPagination.dto";
import { invitationService } from "./service";

const invitationQueryKey = {
  all: () => ["invitations"] as const,
  findByPagination: (
    invitationOffsetPaginationReqDto: InvitationOffsetPaginationRequestDto
  ) => [...invitationQueryKey.all(), invitationOffsetPaginationReqDto] as const,
};

export const invitationQueryOptions = {
  all: () => ({
    queryKey: invitationQueryKey.all(),
    queryFn: () => {},
  }),
  findByPagination: (
    invitationOffsetPaginationReqDto: InvitationOffsetPaginationRequestDto
  ) => ({
    queryKey: invitationQueryKey.findByPagination(
      invitationOffsetPaginationReqDto
    ),
    queryFn: () =>
      invitationService.findByPagination(invitationOffsetPaginationReqDto),
  }),
};
