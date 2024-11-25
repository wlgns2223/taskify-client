import Link from "next/link";
import logoText from "@/../public/logo-text-primary.svg";
import Image from "next/image";
import { JhButton } from "../ui/jh-button";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { SideDashboards } from "./dashboards";
import { Suspense } from "react";

export const SideMenu: React.FC = () => {
  return (
    <aside className="w-16 flex flex-col md:w-40 lg:w-[300px] border border-l-0 border-y-0 border-r-neutral-200 h-screen p-4">
      <Link href={"/"} className="">
        <Image src={logoText} alt="logo" className="" />
      </Link>

      <div className="flex mt-16 items-center justify-center md:justify-between">
        <p className="text-neutral-600 text-xs lg:text-base hidden md:block px-2">
          {"Dash Boards"}
        </p>
        <JhButton variants="reset" className="p-2 md:-mr-2">
          <PlusCircleIcon className="w-5 h-5 text-neutral-400" />
        </JhButton>
      </div>
      <SideDashboards />
    </aside>
  );
};
