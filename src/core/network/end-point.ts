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
    refresh() {
      return "/auth/client-renew";
    },
  },
  invitation: {
    create() {
      return "/invitations";
    },
    read(dto: OffsetPaginationRequestDto) {
      const baseUrl = "/invitations";
      const queries = qs.stringify(dto);
      return `${baseUrl}?${queries}`;
    },
    update(id: number) {
      return `/invitations/${id}`;
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
    read(dashboardId: number) {
      return `/columns?dashboardId=${dashboardId}`;
    },

    swap(dashboardId: number) {
      return `/columns/swap/${dashboardId}`;
    },
    update(id: number) {
      return `/columns/${id}`;
    },
    delete(columnId: number, dashboardId: number) {
      return `/columns/${columnId}?dashboardId=${dashboardId}`;
    },
  },
  todos: {
    create() {
      return "/todos";
    },
    read(columnId: number) {
      return `/todos?columnId=${columnId}`;
    },
    readByPagination(columnId: number, dto: OffsetPaginationRequestDto) {
      const baseUrl = `/todos/column/${columnId}/pagination`;
      const queries = qs.stringify(dto);
      return `${baseUrl}?${queries}`;
    },
  },
  user: {
    me(accessToken: string) {
      return `/users/me?accessToken=${accessToken}`;
    },
  },
  members: {
    getByDashboardId(dashboardId: number) {
      return `/members?dashboardId=${dashboardId}`;
    },
  },
};
