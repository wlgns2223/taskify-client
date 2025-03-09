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
