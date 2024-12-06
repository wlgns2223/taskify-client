import { z } from "zod";

export const MemberSchema = z.object({
  id: z.number().int(),
  dashboardId: z.number().int(),
  memberId: z.number().int(),
  nickname: z.string(),
  createdAt: z.string(),
});

export type MemberSchemaDto = z.infer<typeof MemberSchema>;
