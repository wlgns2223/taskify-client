import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { JHInput } from "../../core/ui/jh-input";
import { JhButton } from "../../core/ui/jh-button";
import { Dispatch, SetStateAction, useState } from "react";
import {
  InvitationOffsetPaginationRequestDto,
  OffsetPaginationResponseDto,
} from "../../libs/dashboard/dto/offsetPagination.dto";
import {
  InvitationSchema,
  InvitationStatusEnum,
} from "../../libs/dashboard/dto/invitations.dto";
import { InvitationStatusButtons } from "./invitation-status-buttons";
import { match } from "ts-pattern";
import { InvitationStatusText } from "./invitation-status-text";

interface InvitationPendingListProps {
  offsetPaginationDto: InvitationOffsetPaginationRequestDto;
  setOffsetPaginationDto: Dispatch<
    SetStateAction<InvitationOffsetPaginationRequestDto>
  >;
  invitationsWithPagination: OffsetPaginationResponseDto<InvitationSchema>;
}

export const InvitationPendingList: React.FC<InvitationPendingListProps> = ({
  invitationsWithPagination,
  offsetPaginationDto,
  setOffsetPaginationDto,
}) => {
  const [keyword, setKeyword] = useState<string>("");

  const handleSearch = () => {
    setOffsetPaginationDto({
      ...offsetPaginationDto,
      search: keyword,
    });
  };
  return (
    <div className="flex flex-col px-6 py-8 bg-neutral-50 rounded-lg mt-11">
      <p className="font-bold text-2xl">{"초대받은 대시보드"}</p>
      <form
        className="relative mt-8"
        onClick={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <MagnifyingGlassIcon className="w-6 h-6 text-neutral-700 absolute top-2 left-4" />
        <label htmlFor="search" className="sr-only">
          {"검색"}
        </label>
        <JHInput
          id="search"
          className="px-11 py-2 "
          placeholder="대시보드 이름으로 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.currentTarget.value)}
        />
        <JhButton className="sr-only" type="submit" />
      </form>
      <ul className="mt-6 divide-y">
        <li className="mb-6">
          <div className="grid grid-cols-3">
            <span className="text-neutral-400">{"이름"}</span>
            <span className="text-neutral-400">{"초대자"}</span>
            <span className="text-neutral-400">{"수락여부"}</span>
          </div>
        </li>
        {invitationsWithPagination.data.map((invitation) => (
          <li key={invitation.id} className="py-4">
            <div className="grid grid-cols-3 items-center min-h-10">
              <span>{invitation.dashboardTitle}</span>
              <span>{invitation.inviterNickname}</span>
              {match(invitation.status)
                .with(InvitationStatusEnum.enum.pending, () => (
                  <InvitationStatusButtons
                    invitationId={invitation.id}
                    offsetPaginationDto={offsetPaginationDto}
                  />
                ))
                .otherwise(() => (
                  <InvitationStatusText status={invitation.status} />
                ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
