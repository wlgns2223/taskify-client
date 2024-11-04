"use client";

import Link from "next/link";
import { useSideMenu } from "./useSideMenu";
import { useIntersectionObserver } from "usehooks-ts";
import { useEffect } from "react";

export const SideDashboards: React.FC = () => {
  const { data: dashboards, fetchNextPage, hasNextPage } = useSideMenu();
  const { isIntersecting, ref } = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage]);

  return (
    <div className="mt-3 overflow-scroll flex-1">
      <ul className="">
        {dashboards.map((dashboard, index) => (
          <Link
            href={`/dashboard/`}
            className="flex justify-center items-center border border-neutral-200 bg-white w-full max-w-[330px] h-[70px] px-4 py-5 rounded-md "
            key={index}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <div style={{}} className="rounded-full w-2 h-2" />
                <p className="ml-4">{dashboard.title}</p>
              </div>
              <p>{">"}</p>
            </div>
          </Link>
        ))}
      </ul>
      <div ref={ref} className="w-full h-1" />
    </div>
  );
};
