import { Service } from "../../core/network/service";
import { GetMembersByDashboardIdDto } from "./dto/getMembersBydashboardId.dto";
import { MemberSchemaDto } from "./dto/member.dto";

class MemberService extends Service {
  constructor() {
    super();
  }

  async getMembersByDashboardId(id: GetMembersByDashboardIdDto) {
    const result = GetMembersByDashboardIdDto.safeParse(id);
    if (!result.success) {
      throw new Error("Invalid type of dashboard id");
    }
    const res = await this.apiHandler.get<MemberSchemaDto[]>(
      this.endPoints.members.getByDashboardId(id)
    );
    return res.data;
  }
}

export const memberService = new MemberService();
