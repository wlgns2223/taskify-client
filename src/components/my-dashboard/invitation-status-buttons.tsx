import { useMutation, useQueryClient } from "@tanstack/react-query";
import { JhButton } from "../../core/ui/jh-button";
import {
  InvitationSchema,
  InvitationStatusEnum,
} from "../../libs/dashboard/dto/invitations.dto";
import { queryOptions } from "../../libs/dashboard/query-options";
import {
  InvitationOffsetPaginationRequestDto,
  OffsetPaginationResponseDto,
} from "../../libs/dashboard/dto/offsetPagination.dto";

interface InvitationStatusButtonsProps {
  invitationId: number;
  offsetPaginationDto: InvitationOffsetPaginationRequestDto;
}

export const InvitationStatusButtons: React.FC<
  InvitationStatusButtonsProps
> = ({ invitationId, offsetPaginationDto }) => {
  const qc = useQueryClient();

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

  const { mutate } = useMutation({
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

  const handleAccept = () => {
    mutate({
      invitationId,
      status: InvitationStatusEnum.enum.accepted,
    });
  };

  const handleDecline = () => {
    mutate({
      invitationId,
      status: InvitationStatusEnum.enum.declined,
    });
  };

  return (
    <div className="flex text-sm">
      <JhButton className="px-6 py-2" onClick={handleAccept}>
        {"수락"}
      </JhButton>
      <JhButton
        className="px-6 py-2 text-primary ml-2"
        variants="outline"
        onClick={handleDecline}
      >
        {"거절"}
      </JhButton>
    </div>
  );
};
