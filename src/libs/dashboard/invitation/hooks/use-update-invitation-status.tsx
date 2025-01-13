import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryOptions } from "../../query-options";
import {
  InvitationSchema,
  InvitationStatusEnum,
} from "../../dto/invitations.dto";
import {
  InvitationOffsetPaginationRequestDto,
  OffsetPaginationResponseDto,
} from "../../dto/offsetPagination.dto";

type UpdateInvitationStatusParam = {
  offsetPaginationDto: InvitationOffsetPaginationRequestDto;
};

export const useUpdateInvitationStatus = (
  param: UpdateInvitationStatusParam
) => {
  const qc = useQueryClient();
  const { offsetPaginationDto } = param;
  const updateTargetInvitationStatus = (
    oldData: OffsetPaginationResponseDto<InvitationSchema>["data"],
    param: { invitationId: number; status: InvitationStatusEnum }
  ) => {
    return oldData.map((invitation: InvitationSchema) =>
      invitation.id === param.invitationId
        ? { ...invitation, status: param.status }
        : invitation
    );
  };
  return useMutation({
    mutationFn: queryOptions.updateInvitationStatus().queryFn,
    onMutate: async (data: {
      invitationId: number;
      status: InvitationStatusEnum;
    }) => {
      await qc.cancelQueries({
        queryKey:
          queryOptions.getInvitationsWithPagination(offsetPaginationDto)
            .queryKey,
      });
      const prevInvitations = qc.getQueryData(
        queryOptions.getInvitationsWithPagination(offsetPaginationDto).queryKey
      );

      qc.setQueryData(
        queryOptions.getInvitationsWithPagination(offsetPaginationDto).queryKey,
        (oldData: OffsetPaginationResponseDto<InvitationSchema>) => {
          return {
            ...oldData,
            data: updateTargetInvitationStatus(oldData.data, data),
          };
        }
      );

      return { prevInvitations };
    },
  });
};
