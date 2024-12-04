import qs from "qs";
import { OffsetPaginationRequestDto } from "../../libs/dashboard/dto/offsetPagination.dto";

export const END_POINT = {
  auth: {
    signIn() {
      return "/auth/signIn";
    },
    signUp() {
      return "/auth/signUp";
    },
  },
  invitation: {
    create() {
      return "/invitations";
    },
    read(dto: OffsetPaginationRequestDto) {
      const baseUrl = "/invitations";
      const queries = qs.stringify(dto);

      console.log(`${baseUrl}?${queries}`);

      return `${baseUrl}?${queries}`;
    },
  },
  dashboard: {
    create() {
      return "/dashboards";
    },
    read(dto: OffsetPaginationRequestDto) {
      const baseUrl = "/dashboards";
      const queries = qs.stringify(dto);
      return `${baseUrl}?${queries}`;
    },
    detail(id: string) {
      return `/dashboards/${id}`;
    },
    getByDashboardId(id: string) {
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
