import {
  UseMutationOptions,
  useMutation,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { invitationQueryOptions } from "./query-key";
import { InvitationOffsetPaginationRequestDto } from "../../../dashboard/dto/offsetPagination.dto";
import { CreateInvitationDto } from "../../../dashboard/invitation/dto/createInvitation.dto";
import { invitationService } from "./service";
import { useToast } from "../../../../core/hooks/useToast";
import { InvitationSchema } from "../../../dashboard/dto/invitations.dto";

export const useInvitationWithPagination = (
  offsetPaginationDto: InvitationOffsetPaginationRequestDto
) => {
  return useSuspenseQuery({
    ...invitationQueryOptions.findByPagination(offsetPaginationDto),
  });
};

type MutationOptions = Pick<
  UseMutationOptions<InvitationSchema, Error, CreateInvitationDto>,
  "onError" | "onSuccess" | "onSettled"
>;
export const useCreateInvitation = (options?: MutationOptions) => {
  const { notify } = useToast();

  return useMutation({
    mutationFn: async (dto: CreateInvitationDto) =>
      await invitationService.create(dto),
    onError: (err, variables, context) => {
      notify(err.message);
      if (options?.onError) {
        options.onError(err, variables, context);
      }
    },
    onSuccess: (data, variables, context) => {
      notify("초대 메일이 발송되었습니다.");
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onSettled: (data, error, variables, context) => {
      if (options?.onSettled) {
        options.onSettled(data, error, variables, context);
      }
    },
  });
};
