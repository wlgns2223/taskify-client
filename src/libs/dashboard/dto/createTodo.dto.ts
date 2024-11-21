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
  position: true,
  imageUrl: true,
});

export type CreateTodoDto = z.infer<typeof CreateTodoDtoSchema>;
