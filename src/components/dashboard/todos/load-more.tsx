import { useIntersectionObserver } from "usehooks-ts";
import { JhButton } from "../../../core/ui/jh-button";
import { useEffect } from "react";

interface LoadMoreProps {
  isPC: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

export const LoadMore: React.FC<LoadMoreProps> = ({
  isPC,
  fetchNextPage,
  hasNextPage,
}) => {
  const { isIntersecting, ref } = useIntersectionObserver();

  const handleFetchNextPage = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (isPC && isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isPC, isIntersecting, hasNextPage]);

  if (isPC) {
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
