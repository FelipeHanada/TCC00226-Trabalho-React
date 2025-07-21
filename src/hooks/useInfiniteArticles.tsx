import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

interface Author {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  aboutMe: string;
}

interface Article {
  id: number;
  title: string;
  description: string;
  cardImage: string;
  contentMD: string;
  author: Author;
}

interface PageResult<T> {
  items: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  empty: boolean;
}

interface UseInfiniteArticlesReturn {
  articles: Article[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasNextPage: boolean;
  loadMore: () => void;
  refreshArticles: () => void;
}

const useInfiniteArticles = (pageSize: number = 20): UseInfiniteArticlesReturn => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchArticles = useCallback(async (page: number = 0, append: boolean = false) => {
    try {
      if (page === 0) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);
      
      const response = await axios.get<PageResult<Article>>(
        `http://localhost:8080/article?page=${page}&pageSize=${pageSize}`
      );
      
      if (append) {
        setArticles(prevArticles => [...prevArticles, ...response.data.items]);
      } else {
        setArticles(response.data.items);
      }
      
      setCurrentPage(page);
      setHasNextPage(!response.data.last);
      
    } catch (err) {
      setError('Erro ao carregar artigos. Verifique sua conexão.');
      console.error('Erro ao buscar artigos:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [pageSize]);

  const loadMore = useCallback(() => {
    if (hasNextPage && !loadingMore && !loading) {
      fetchArticles(currentPage + 1, true);
    }
  }, [hasNextPage, loadingMore, loading, currentPage, fetchArticles]);

  const refreshArticles = useCallback(() => {
    setCurrentPage(0);
    fetchArticles(0, false);
  }, [fetchArticles]);

  useEffect(() => {
    fetchArticles(0, false);
  }, [fetchArticles]);

  return {
    articles,
    loading,
    loadingMore,
    error,
    hasNextPage,
    loadMore,
    refreshArticles
  };
};

export default useInfiniteArticles;
export type { Article, Author };

