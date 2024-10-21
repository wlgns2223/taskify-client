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
      const queryParams = qs.stringify(dto);
      return `${baseUrl}?${queryParams}`;
    }
    return baseUrl;
  },
};
