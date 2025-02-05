import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../../core/hooks/useToast";
import { createDashBoard } from "../create-dashboard";
import { CreateDashBoardDtoSchema } from "../dto/createDashboards.dto";
import { useState } from "react";
import { colors } from "../../../components/my-dashboard/dashboard-create-content";
import { myDashboardQueryOptions } from "../../my-dashboard/services/query-key";

export const useCreateDashboard = () => {
  const { notify } = useToast();
  const queryClient = useQueryClient();

  const [dashBoardCreateDto, setDashBoardCreateDto] =
    useState<CreateDashBoardDtoSchema>({
      title: "",
      color: colors[0].hex,
    });

  const invalidateDashboards = () => {
    queryClient.invalidateQueries({
      queryKey: myDashboardQueryOptions.all().queryKey,
    });
  };

  const { mutate: createDashboardMutation, ...rest } = useMutation({
    mutationFn: createDashBoard,
    onSuccess: () => {
      notify("대시보드가 생성되었습니다.");
      invalidateDashboards();
    },
    onError: (error) => {
      notify(error.message);
    },
  });

  return {
    createDashboardMutation,
    dashBoardCreateDto,
    setDashBoardCreateDto,
    ...rest,
  };
};
