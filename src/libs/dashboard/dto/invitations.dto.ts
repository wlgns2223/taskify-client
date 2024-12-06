import { z } from "zod";

export const InvitationStatusEnum = z.enum(["accepted", "declined", "pending"]);
export const InvitationSchema = z.object({
  id: z.number().int(),
  dashboardTitle: z.string(),
  inviterNickname: z.string(),
  status: InvitationStatusEnum,
  createdAt: z.string(),
});

export type InvitationSchema = z.infer<typeof InvitationSchema>;
export type InvitationStatusEnum = z.infer<typeof InvitationStatusEnum>;
