import { Service } from "../../../../core/network/service";
import { CreateTodoDto } from "../dto/createTodo.dto";
import { Todo } from "../dto/todo.dto";

class TodoService extends Service {
  constructor() {
    super();
  }

  async create(dto: CreateTodoDto) {
    const res = await this.apiHandler.post<CreateTodoDto, Todo>(
      this.endPoints.todos.create(),
      dto
    );
    return res.data;
  }

  async findManyBy(columnId: number) {
    const res = await this.apiHandler.get(this.endPoints.todos.read(columnId));
    return res.data;
  }
}

export const todoService = new TodoService();
