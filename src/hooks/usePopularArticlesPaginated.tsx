import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import type { Article } from "../interfaces/Article";

interface PageResult<T> {
  items: T[];
  totalElements: number;
  numberOfPages: number;
  currentPage: number;
  pageSize: number;
}

interface UsePopularArticlesPaginatedReturn {
  articles: Article[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  numberOfPages: number;
  totalElements: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  refetch: () => void;
}

export default function usePopularArticlesPaginated(
  pageSize: number = 6
): UsePopularArticlesPaginatedReturn {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const fetchArticles = useCallback(
    async (page: number = 0) => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get<PageResult<Article>>(
          `http://localhost:8080/article?page=${page}&pageSize=${pageSize}`
        );

        setArticles(response.data.items);
        setCurrentPage(page);
        setNumberOfPages(response.data.numberOfPages || 0);
        setTotalElements(response.data.totalElements || 0);

        console.log("Articles loaded:", {
          page,
          numberOfPages: response.data.numberOfPages,
          totalElements: response.data.totalElements,
          itemsCount: response.data.items.length,
        });
      } catch (error) {
        console.error("Erro ao carregar artigos:", error);
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message ||
              "Erro ao carregar receitas populares"
          );
        } else {
          setError("Erro inesperado ao carregar receitas populares");
        }
      } finally {
        setLoading(false);
      }
    },
    [pageSize]
  );

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 0 && page < numberOfPages && !loading) {
        fetchArticles(page);
      }
    },
    [numberOfPages, loading, fetchArticles]
  );

  const nextPage = useCallback(() => {
    if (currentPage < numberOfPages - 1 && !loading) {
      fetchArticles(currentPage + 1);
    }
  }, [currentPage, numberOfPages, loading, fetchArticles]);

  const previousPage = useCallback(() => {
    if (currentPage > 0 && !loading) {
      fetchArticles(currentPage - 1);
    }
  }, [currentPage, loading, fetchArticles]);

  const refetch = useCallback(() => {
    setCurrentPage(0);
    setNumberOfPages(0);
    setTotalElements(0);
    fetchArticles(0);
  }, [fetchArticles]);

  useEffect(() => {
    fetchArticles(0);
  }, [fetchArticles]);

  return {
    articles,
    loading,
    error,
    currentPage,
    numberOfPages,
    totalElements,
    goToPage,
    nextPage,
    previousPage,
    refetch,
  };
}
