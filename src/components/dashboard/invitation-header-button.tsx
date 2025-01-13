"use client";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { JhButton } from "../../core/ui/jh-button";
import { useModal } from "../../core/hooks/useModal";
import { JhModal } from "../../core/ui/modal/jh-modal";
import { JHInput } from "../../core/ui/jh-input";
import { useState } from "react";
import { useUserContext } from "../../core/user/context";
import { CreateInvitationDto } from "../../libs/dashboard/invitation/dto/createInvitation.dto";
import { useToast } from "../../core/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { dashboardService } from "../../libs/dashboard/dashboard.service";
import { useDashboardContext } from "../../core/providers/dashboard-provider";

export const InvitationHeaderButton: React.FC = () => {
  const modalHook = useModal();
  const [email, setEmail] = useState("");

  const { userInfo } = useUserContext();
  const { notify } = useToast();
  const { dashboard } = useDashboardContext();
  const { mutate } = useMutation({
    mutationFn: async (dto: CreateInvitationDto) =>
      await dashboardService.createInvitation(dto),
    onError: (err) => {
      notify(err.message);
      setEmail("");
    },
    onSuccess: () => {
      notify("초대 메일이 발송되었습니다.");
      setEmail("");
      modalHook.setIsOpen(false);
    },
  });

  const handleCreateInvitation = () => {
    const dto: CreateInvitationDto = {
      inviteeEmail: email,
      dashboardId: dashboard.id,
      inviterId: userInfo.id,
      dashboardTitle: dashboard.title,
    };

    mutate(dto);
  };

  return (
    <>
      <JhButton
        className="flex items-center justify-center px-4 py-1 border border-neutral-200 rounded-lg"
        variants="outline"
        onClick={() => modalHook.setIsOpen(true)}
      >
        <UserPlusIcon className="w-5 h-5 hidden sm:block" />
        <span className="sm:ml-2 text-nowrap ">{"초대하기"}</span>
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
    </>
  );
};
