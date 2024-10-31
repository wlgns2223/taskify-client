import { Service } from "../network/service";

class UserService extends Service {
  constructor() {
    super();
  }

  async getUser(accessToken: string) {
    const res = await this.apiHandler.get(this.endPoints.user.me(accessToken));
    return res.data;
  }
}

export const userService = new UserService();
