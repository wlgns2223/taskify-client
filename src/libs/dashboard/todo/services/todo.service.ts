import { Service } from "../../../../core/network/service";

class TodoService extends Service {
  constructor() {
    super();
  }

  async getTodosByColumnId(columnId: string) {
    const res = await this.apiHandler.get(this.endPoints.todos.read(columnId));
    return res.data;
  }
}

export const todoService = new TodoService();
