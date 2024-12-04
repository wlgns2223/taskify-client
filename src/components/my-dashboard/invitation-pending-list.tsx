import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { JHInput } from "../../core/ui/jh-input";
import { JhButton } from "../../core/ui/jh-button";
import { Dispatch, SetStateAction, useState } from "react";
import {
  OffsetPaginationRequestDto,
  OffsetPaginationResponseDto,
} from "../../libs/dashboard/dto/offsetPagination.dto";
import { InvitationSchema } from "../../libs/dashboard/dto/invitations.dto";
import { PaginationButtons } from "./dashboard-pages-number";

interface InvitationPendingListProps {
  offsetPaginationDto: OffsetPaginationRequestDto;
  setOffsetPaginationDto: Dispatch<SetStateAction<OffsetPaginationRequestDto>>;
  invitationsWithPagination: OffsetPaginationResponseDto<InvitationSchema>;
}

export const InvitationPendingList: React.FC<InvitationPendingListProps> = ({
  invitationsWithPagination,
  offsetPaginationDto,
  setOffsetPaginationDto,
}) => {
  return (
    <div className="flex flex-col px-6 py-8 bg-neutral-50 rounded-lg mt-11">
      <p className="font-bold text-2xl">{"초대받은 대시보드"}</p>
      <form
        className="relative mt-8"
        onClick={(e) => {
          e.preventDefault();
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
        />
        <JhButton className="sr-only" />
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
            <div className="grid grid-cols-3 items-center">
              <span>{invitation.dashboardTitle}</span>
              <span>{invitation.inviterNickname}</span>
              <div className="flex text-sm">
                <JhButton className="px-6 py-2">{"수락"}</JhButton>
                <JhButton
                  className="px-6 py-2 text-primary ml-2"
                  variants="outline"
                >
                  {"거절"}
                </JhButton>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
