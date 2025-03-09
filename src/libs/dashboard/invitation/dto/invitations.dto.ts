import { z } from "zod";
import { Base, User } from "../../../../core/user/user.dto";

export const InvitationStatusEnum = z.enum(["accepted", "declined", "pending"]);
export const InvitationSchema = Base.extend({
  inviter: User,
  status: InvitationStatusEnum,
  dashboardId: z.number(),
  dashboardTitle: z.string(),
  inviterNickname: z.string(),
});

export type InvitationSchema = z.infer<typeof InvitationSchema>;
export type InvitationStatusEnum = z.infer<typeof InvitationStatusEnum>;
