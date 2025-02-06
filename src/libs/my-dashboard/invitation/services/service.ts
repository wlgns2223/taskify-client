import { Service } from "../../../../core/network/service";
import {
  InvitationSchema,
  InvitationStatusEnum,
} from "../../../dashboard/dto/invitations.dto";
import {
  InvitationOffsetPaginationRequestDto,
  OffsetPaginationResponseDto,
  offsetPaginationRequestDtoSchema,
} from "../../../dashboard/dto/offsetPagination.dto";
import {
  CreateInvitationDto,
  CreateInvitationDtoSchema,
} from "../../../dashboard/invitation/dto/createInvitation.dto";

class InviationService extends Service {
  constructor() {
    super();
  }

  async create(createInvitationDto: CreateInvitationDto) {
    const result = CreateInvitationDtoSchema.safeParse(createInvitationDto);
    if (!result.success) {
      throw new Error(result.error.flatten().fieldErrors.dashboardId?.[0]);
    }

    const res = await this.apiHandler.post<CreateInvitationDto>(
      this.endPoints.invitation.create(),
      createInvitationDto
    );
    return res.data;
  }

  async findByPagination(
    offsetPaginationReqDto: InvitationOffsetPaginationRequestDto
  ) {
    const result = offsetPaginationRequestDtoSchema.safeParse(
      offsetPaginationReqDto
    );
    if (!result.success) {
      throw new Error(result.error.message);
    }

    const res = await this.apiHandler.get<
      OffsetPaginationResponseDto<InvitationSchema>
    >(this.endPoints.invitation.read(offsetPaginationReqDto));
    return res.data;
  }

  async updateStatus(invitationId: number, status: InvitationStatusEnum) {
    const result = InvitationStatusEnum.safeParse(status);
    if (!result.success) {
      throw new Error(result.error.message);
    }
    const res = await this.apiHandler.put(
      this.endPoints.invitation.update(invitationId),
      { status }
    );
    return res.data;
  }
}

export const invitationService = new InviationService();
