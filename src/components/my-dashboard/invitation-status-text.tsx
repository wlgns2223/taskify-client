import { match } from "ts-pattern";
import { InvitationStatusEnum } from "../../libs/dashboard/dto/invitations.dto";
import {
  CheckCircleIcon,
  CheckIcon,
  ExclamationCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";

interface InvitationStatusTextProps {
  status: InvitationStatusEnum;
}

export const InvitationStatusText: React.FC<InvitationStatusTextProps> = ({
  status,
}) => {
  console.log(status);
  return match(status)
    .with(InvitationStatusEnum.enum.accepted, () => (
      <div className="text-neutral-400 flex items-center">
        <CheckCircleIcon className="w-4 h-4 text-primary" />
        <span className="ml-2">{"수락 완료"}</span>
      </div>
    ))
    .with(InvitationStatusEnum.enum.declined, () => (
      <div className="text-neutral-400 flex items-center">
        <NoSymbolIcon className="w-4 h-4 text-red-400" />
        <span className="ml-2">{"거절 완료"}</span>
      </div>
    ))
    .otherwise(() => (
      <div className="text-neutral-400 flex items-center">
        <ExclamationCircleIcon className="w-4 h-4 text-yellow-400" />
        <span className="ml-2">{"알 수 없는 오류"}</span>
      </div>
    ));
};
