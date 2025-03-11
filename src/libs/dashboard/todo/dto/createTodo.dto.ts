import { z } from "zod";
import { Todo } from "./todo.dto";

export const CreateTodoDtoSchema = Todo.pick({
  assigneeUserId: true,
  assignerUserId: true,
  columnId: true,
  dashboardId: true,
  content: true,
  dueDate: true,
  title: true,
}).extend({
  imageFile: z.instanceof(File).optional(),
  tags: z.string().array().default([]),
});

export type CreateTodoDto = z.infer<typeof CreateTodoDtoSchema>;
