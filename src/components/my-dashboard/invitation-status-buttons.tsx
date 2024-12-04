import { useMutation, useQueryClient } from "@tanstack/react-query";
import { JhButton } from "../../core/ui/jh-button";
import { InvitationStatusEnum } from "../../libs/dashboard/dto/invitations.dto";
import { queryOptions } from "../../libs/dashboard/query-options";

interface InvitationStatusButtonsProps {
  invitationId: number;
}

export const InvitationStatusButtons: React.FC<
  InvitationStatusButtonsProps
> = ({ invitationId }) => {
  const qc = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: queryOptions.updateInvitationStatus().queryFn,
    onMutate: async (data: {
      invitationId: number;
      status: InvitationStatusEnum;
    }) => {
      await qc.cancelQueries({});
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
