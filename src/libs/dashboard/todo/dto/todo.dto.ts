import { z } from "zod";
import { User } from "../../../../core/user/user.dto";

export const Todo = z.object({
  id: z.number().int(),
  columnId: z.number().int(),
  dashboardId: z.number().int(),
  assigneeUserId: z.number().int(),
  assignerUserId: z.number().int(),
  assignee: User,
  title: z.string(),
  content: z.string(),
  dueDate: z.string(),
  tags: z.array(z.object({ id: z.number().int(), tag: z.string() })),
  imageUrl: z.string().optional(),
  position: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Todo = z.infer<typeof Todo>;
