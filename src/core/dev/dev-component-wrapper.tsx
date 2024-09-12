"use client";

import { PropsWithChildren } from "react";

const isDev = process.env.NODE_ENV === "development";
export const DevComponentWrapper: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return isDev ? <div>{children}</div> : null;
};
