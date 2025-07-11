import { useEffect, useState } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  hasNextPage?: boolean;
  loading?: boolean;
}

const useInfiniteScroll = (
  callback: () => void,
  options: UseInfiniteScrollOptions = {}
) => {
  const { threshold = 200, hasNextPage = true, loading = false } = options;
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasNextPage) return;

      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - threshold;

      if (isNearBottom && !isFetching) {
        setIsFetching(true);
        callback();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback, threshold, hasNextPage, loading, isFetching]);

  useEffect(() => {
    if (!loading) {
      setIsFetching(false);
    }
  }, [loading]);

  return [isFetching, setIsFetching] as const;
};

export default useInfiniteScroll;
