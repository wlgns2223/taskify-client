import { z } from "zod";

export const CreateInvitationDtoSchema = z.object({
  inviteeEmail: z.string().email(),
  inviterId: z.number().int(),
  dashboardId: z.number().int(),
});

export type CreateInvitationDto = z.infer<typeof CreateInvitationDtoSchema>;
