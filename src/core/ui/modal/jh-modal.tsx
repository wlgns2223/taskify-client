"use client";

import clsx from "clsx";
import { Fragment, HTMLProps, PropsWithChildren, useState } from "react";
import { twMerge } from "tailwind-merge";
import { JhButton, JhButtonProps } from "../jh-button";
import { ModalPortal } from "./modal-portal";
import { Transition, TransitionChild } from "@headlessui/react";
import { ModalHookProps } from "../../hooks/useModal";
import { on } from "events";

interface ModalProps extends HTMLProps<HTMLDivElement> {
  buttonProps?: JhButtonProps;
  onConfirm?: () => void;
  onClose?: () => void;
  isOpen: boolean;
  text?: string;
}

export const JhModal: React.FC<PropsWithChildren<ModalProps>> = ({
  buttonProps,
  children,
  onConfirm,
  onClose,
  isOpen,
  text,
  ...props
}) => {
  return (
    <>
      <Transition as={"div"} show={isOpen}>
        <ModalPortal>
          <div className="fixed inset-0 flex justify-center items-center p-6">
            <TransitionChild
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 "
              enterTo="opacity-30 "
              leave="transition ease-in duration-150"
              leaveFrom="opacity-30"
              leaveTo="opacity-0 "
            >
              <div
                className="absolute inset-0 bg-neutral-800  hover:cursor-pointer"
                onClick={onClose}
              />
            </TransitionChild>
            <TransitionChild
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 "
              enterTo="opacity-100 "
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0 "
            >
              <div
                {...props}
                className={twMerge(
                  clsx("relative bg-white p-8 rounded-lg", props.className)
                )}
              >
                {children}
                <div className="flex justify-between sm:justify-end gap-3 mt-6">
                  <JhButton
                    className="flex-1 sm:flex-none min-w-32"
                    variants="outline"
                    onClick={onClose}
                  >
                    {"취소"}
                  </JhButton>
                  <JhButton className="flex-1 sm:flex-none min-w-32">
                    {"생성"}
                  </JhButton>
                </div>
              </div>
            </TransitionChild>
          </div>
        </ModalPortal>
      </Transition>
    </>
  );
};
