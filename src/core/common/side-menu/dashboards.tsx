"use client";

import Link from "next/link";
import { useSideMenu } from "./useSideMenu";
import { useIntersectionObserver } from "usehooks-ts";
import { useEffect } from "react";
import { useUserContext } from "../../user/context";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

export const SideDashboards: React.FC = () => {
  const { data: dashboards, fetchNextPage, hasNextPage } = useSideMenu();
  const { isIntersecting, ref } = useIntersectionObserver();
  const { userInfo } = useUserContext();

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage]);

  return (
    <div className="mt-3 overflow-scroll flex-1">
      <ul className="">
        {dashboards &&
          dashboards.map((dashboard, index) => (
            <li key={dashboard.id}>
              <Link
                href={`/dashboard/${dashboard.id}`}
                className="flex justify-center md:justify-start w-full max-w-[330px] h-[45px] px-2 py-3 hover:bg-primary-light hover:rounded-md"
              >
                <div className="flex items-center">
                  <div
                    style={{
                      backgroundColor: dashboard.color,
                    }}
                    className="rounded-full w-2 h-2"
                  />
                  <p className="ml-4 hidden md:block ">{dashboard.title}</p>
                  {dashboard.ownerId === userInfo.id && (
                    <CheckBadgeIcon className="text-blue-400 w-5 h-5 ml-2 hidden md:block" />
                  )}
                </div>
              </Link>
            </li>
          ))}
      </ul>
      <div ref={ref} className="w-full h-1" />
    </div>
  );
};
