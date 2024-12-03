import { z } from "zod";

export const InvitationSchema = z.object({
  id: z.number().int(),
  dashboardTitle: z.string(),
  invterEmail: z.string(),
  createdAt: z.string(),
});

export type InvitationSchema = z.infer<typeof InvitationSchema>;
