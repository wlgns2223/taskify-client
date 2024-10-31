import { match } from "ts-pattern";
import { ReadDashboardsDtoSchema } from "../../libs/dashboard/dto/readDashboards.dto";
import qs from "qs";

export const END_POINT = {
  auth: {
    signIn() {
      return "/auth/signin";
    },
  },
  dashboard(dto?: ReadDashboardsDtoSchema) {
    const baseUrl = "/dashboards";
    if (dto) {
      const cursor =
        dto.direction === "next" ? dto.cursor?.next : dto.cursor?.prev;
      const queryParams = qs.stringify({
        cursor,
        limit: dto.limit,
        direction: dto.direction,
      });

      return `${baseUrl}?${queryParams}`;
    }
    return baseUrl;
  },
  user: {
    me(accessToken: string) {
      return `/users/me?accessToken=${accessToken}`;
    },
  },
};
