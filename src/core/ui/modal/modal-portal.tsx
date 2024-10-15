"use client";

import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export const ModalPortal: React.FC<PropsWithChildren> = ({ children }) => {
  const id = "modal_portal";
  const portal = typeof window !== "undefined" && document.getElementById(id);

  if (!portal) {
    return null;
  }
  return createPortal(children, portal);
};
