import { useIntersectionObserver } from "usehooks-ts";
import { JhButton } from "../../../core/ui/jh-button";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

interface LoadMoreProps {
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

export const LoadMore: React.FC<LoadMoreProps> = ({
  fetchNextPage,
  hasNextPage,
}) => {
  const { isIntersecting, ref } = useIntersectionObserver();

  const handleFetchNextPage = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const [isClient, setIsClient] = useState(false);

  const isPC = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage]);

  if (isPC && isClient === true) {
    return <div ref={ref} className="w-full h-1" />;
  }

  return (
    <>
      {hasNextPage && (
        <JhButton
          className="w-3/4 mx-auto flex mt-2 items-center justify-center py-2 text-xs hover:underline text-primary"
          variants="reset"
          onClick={handleFetchNextPage}
        >
          {"더보기"}
        </JhButton>
      )}
    </>
  );
};
