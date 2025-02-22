import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InvitationSchema, InvitationStatusEnum } from "../dto/invitations.dto";
import {
  InvitationOffsetPaginationRequestDto,
  OffsetPaginationResponseDto,
} from "../../dto/offsetPagination.dto";
import { invitationService } from "../../../my-dashboard/invitation/services/service";
import { invitationQueryOptions } from "../../../my-dashboard/invitation/services/query-key";

type UpdateInvitationStatusParam = {
  offsetPaginationDto: InvitationOffsetPaginationRequestDto;
};

type UpdateInvitationStatusDto = {
  invitationId: number;
  status: InvitationStatusEnum;
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
    mutationFn: (updateInvitationStatus: UpdateInvitationStatusDto) =>
      invitationService.updateStatus(
        updateInvitationStatus.invitationId,
        updateInvitationStatus.status
      ),
    onMutate: async (data: {
      invitationId: number;
      status: InvitationStatusEnum;
    }) => {
      await qc.cancelQueries({
        queryKey:
          invitationQueryOptions.findByPagination(offsetPaginationDto).queryKey,
      });
      const prevInvitations = qc.getQueryData(
        invitationQueryOptions.findByPagination(offsetPaginationDto).queryKey
      );

      qc.setQueryData(
        invitationQueryOptions.findByPagination(offsetPaginationDto).queryKey,
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
