"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { useModal } from "../../core/hooks/useModal";
import { JhButton } from "../../core/ui/jh-button";
import { JhModal } from "../../core/ui/modal/jh-modal";
import { DashboardCreateContent, colors } from "./dashboard-create-content";
import { useState } from "react";
import { CreateDashBoardDtoSchema } from "../../libs/dashboard/createDashBoardDto";
import { createDashBoard } from "../../libs/dashboard/create-dashboard";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { useToast } from "../../core/hooks/useToast";

export const DashboardCreateModal: React.FC = () => {
  const modalHookProps = useModal();
  const [dashBoardCreateDto, setDashBoardCreateDto] =
    useState<CreateDashBoardDtoSchema>({
      title: "",
      color: colors[0].hex,
    });

  const { notify } = useToast();
  const { mutateAsync: createDashboardMutation } = useMutation({
    mutationFn: createDashBoard,
  });

  const handleCreateDashboard = async () => {
    try {
      await createDashboardMutation(dashBoardCreateDto);
    } catch (e: any) {
      notify(e.message);
    }
  };

  return (
    <>
      <JhButton
        className="flex justify-center items-center border-neutral-200 bg-white w-full max-w-[330px] h-[70px]"
        variants="outline"
        onClick={() => modalHookProps.setIsOpen(true)}
      >
        <p>{"새로운 대시보드"}</p>
        <PlusIcon className="w-4 h-4 text-primary bg-primary-light rounded-sm ml-3" />
      </JhButton>
      <JhModal
        className="w-full max-w-[540px]"
        isOpen={modalHookProps.isOpen}
        onClose={() => modalHookProps.setIsOpen(false)}
        onConfirm={handleCreateDashboard}
      >
        <DashboardCreateContent
          dashboardCreateDto={dashBoardCreateDto}
          setDashBoardCreateDto={setDashBoardCreateDto}
        />
      </JhModal>
      <ToastContainer />
    </>
  );
};
