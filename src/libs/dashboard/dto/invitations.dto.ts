import { z } from "zod";

export const Base = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const User = Base.extend({
  email: z.string().email(),
  nickname: z.string(),
});

export const InvitationStatusEnum = z.enum(["accepted", "declined", "pending"]);
export const InvitationSchema = Base.extend({
  inviter: User,
  status: InvitationStatusEnum,
  dashboardId: z.number(),
});

export type InvitationSchema = z.infer<typeof InvitationSchema>;
export type InvitationStatusEnum = z.infer<typeof InvitationStatusEnum>;
