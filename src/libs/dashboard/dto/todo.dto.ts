import { z } from "zod";

export const Todo = z.object({
  id: z.number().int(),
  columnId: z.string(),
  dashboardId: z.string(),
  assigneeUserId: z.string(),
  assignerUserId: z.string(),
  title: z.string(),
  content: z.string(),
  dueDate: z.string(),
  imageUrl: z.string().optional(),
  position: z.number().int(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
