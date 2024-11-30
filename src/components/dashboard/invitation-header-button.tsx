"use client";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { JhButton } from "../../core/ui/jh-button";
import { useModal } from "../../core/hooks/useModal";
import { JhModal } from "../../core/ui/modal/jh-modal";
import { JHInput } from "../../core/ui/jh-input";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useUserContext } from "../../core/user/context";
import { CreateInvitationDto } from "../../libs/dashboard/dto/createInvitation.dto";
import { useToast } from "../../core/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { dashboardService } from "../../libs/dashboard/dashboard.service";

export const InvitationHeaderButton: React.FC = () => {
  const modalHook = useModal();
  const [email, setEmail] = useState("");
  const pathname = usePathname();
  const { userInfo } = useUserContext();
  const { notify } = useToast();
  const { mutate } = useMutation({
    mutationFn: async (dto: CreateInvitationDto) =>
      await dashboardService.createInvitation(dto),
  });

  const handleCreateInvitation = () => {
    const dashboardId = pathname.split("/").at(-1);
    if (!dashboardId) {
      notify("대시보드 정보를 불러 올 수 없습니다.");
      return;
    }

    const dto: CreateInvitationDto = {
      inviteeEmail: email,
      dashboardId: parseInt(dashboardId, 10),
      inviterId: userInfo.id,
    };

    mutate(dto);
  };

  return (
    <div>
      <JhButton
        className="flex items-center justify-center px-4 py-2 border border-neutral-200 rounded-lg"
        variants="outline"
        onClick={() => modalHook.setIsOpen(true)}
      >
        <UserPlusIcon className="w-5 h-5" />
        <span className="ml-2">{"초대하기"}</span>
      </JhButton>
      <JhModal
        isOpen={modalHook.isOpen}
        closeButtonProps={{
          onClick: () => {
            modalHook.setIsOpen(false);
          },
        }}
        confirmButtonProps={{
          onClick: handleCreateInvitation,
        }}
      >
        <div className="min-w-[540px]">
          <p className="text-2xl">{"초대하기"}</p>
          <form
            className="mt-8"
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateInvitation;
            }}
          >
            <label htmlFor="email" className="text-lg mt-2">
              {"이메일"}
            </label>
            <JHInput
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </form>
        </div>
      </JhModal>
    </div>
  );
};
