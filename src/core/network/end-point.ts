import { match } from "ts-pattern";
import {
  OffsetPaginationRequestDto,
  ReadDashboardsDtoSchema,
} from "../../libs/dashboard/dto/readDashboards.dto";
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
    read(dto?: OffsetPaginationRequestDto) {
      const baseUrl = "/dashboards";
      const queries = qs.stringify(dto);
      return `${baseUrl}?${queries}`;
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
