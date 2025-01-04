"use client";

import { useRouter } from "next/navigation";
import { JhButton } from "../../core/ui/jh-button";
import {
  ArrowLeftIcon,
  ArrowUturnDownIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";

export const GoBackButton: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <JhButton
      variants="reset"
      onClick={handleGoBack}
      className="text-neutral-700 flex items-center"
    >
      <ArrowLeftIcon className="w-5 h-5" />
      <span className="ml-1">{"돌아가기"}</span>
    </JhButton>
  );
};
