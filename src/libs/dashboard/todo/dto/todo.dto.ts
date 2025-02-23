import { z } from "zod";

export const Todo = z.object({
  id: z.number().int(),
  columnId: z.number().int(),
  dashboardId: z.number().int(),
  assigneeUserId: z.number().int(),
  assignerUserId: z.number().int(),
  title: z.string(),
  content: z.string(),
  dueDate: z.date(),
  imageUrl: z.string().optional(),
  position: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Todo = z.infer<typeof Todo>;
