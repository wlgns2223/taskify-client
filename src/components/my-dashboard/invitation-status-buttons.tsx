import { JhButton } from "../../core/ui/jh-button";
import { InvitationStatusEnum } from "../../libs/dashboard/invitation/dto/invitations.dto";
import { InvitationOffsetPaginationRequestDto } from "../../libs/dashboard/dto/offsetPagination.dto";
import { useUpdateInvitationStatus } from "../../libs/dashboard/invitation/hooks/use-update-invitation-status";

interface InvitationStatusButtonsProps {
  invitationId: number;
  offsetPaginationDto: InvitationOffsetPaginationRequestDto;
}

export const InvitationStatusButtons: React.FC<
  InvitationStatusButtonsProps
> = ({ invitationId, offsetPaginationDto }) => {
  const { mutate } = useUpdateInvitationStatus({ offsetPaginationDto });

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
