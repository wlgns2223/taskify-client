import { match } from "ts-pattern";
import { ReadDashboardsDtoSchema } from "../../libs/dashboard/dto/readDashboards.dto";
import qs from "qs";
import { read } from "fs";

export const END_POINT = {
  auth: {
    signIn() {
      return "/auth/signIn";
    },
    signUp() {
      return "/auth/signUp";
    },
  },
  dashboard: {
    create() {
      return "/dashboards";
    },
    read(dto?: ReadDashboardsDtoSchema) {
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
    detail(id: string) {
      return `/dashboards/${id}`;
    },
  },
  columns: {
    create() {
      return "/columns";
    },
    read(dashboardId: string) {
      return `/columns?dashboardId=${dashboardId}`;
    },

    swap(dashboardId: string) {
      return `/columns/swap/${dashboardId}`;
    },
    update(id: string) {
      return `/columns/${id}`;
    },
    delete(columnId: number, dashboardId: number) {
      return `/columns/${columnId}?dashboardId=${dashboardId}`;
    },
  },
  todos: {
    read(columnId: string) {
      return `/todos?columnId=${columnId}`;
    },
  },
  user: {
    me(accessToken: string) {
      return `/users/me?accessToken=${accessToken}`;
    },
  },
};
