import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../core/hooks/useToast";
import { createDashBoard } from "./create-dashboard";
import { CreateDashBoardDtoSchema } from "./dto/createDashboards.dto";
import { useState } from "react";
import { colors } from "../../components/my-dashboard/dashboard-create-content";

interface UseCreateDashboardProps {
  onSuccess?: () => void;
  onError?: (e: any) => void;
}

export const useCreateDashboard = (props?: UseCreateDashboardProps) => {
  const { notify } = useToast();

  const [dashBoardCreateDto, setDashBoardCreateDto] =
    useState<CreateDashBoardDtoSchema>({
      title: "",
      color: colors[0].hex,
    });
  const { mutateAsync: createDashboardMutation, ...rest } = useMutation({
    mutationFn: createDashBoard,
  });

  const handleCreateDashboard = async () => {
    try {
      await createDashboardMutation(dashBoardCreateDto);
      if (props?.onSuccess) {
        props.onSuccess();
      }
    } catch (e: any) {
      notify(e.message);
      if (props?.onError) {
        props.onError(e);
      }
    }
  };

  return {
    handleCreateDashboard,
    dashBoardCreateDto,
    setDashBoardCreateDto,
    ...rest,
  };
};
