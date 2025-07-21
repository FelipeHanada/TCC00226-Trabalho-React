import axios from 'axios';
import { useEffect, useState } from 'react';

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
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}

interface UsePopularArticlesReturn {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

const usePopularArticles = (pageSize: number = 6): UsePopularArticlesReturn => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get<PageResult<Article>>(
          `http://localhost:8080/article?page=0&pageSize=${pageSize}`
        );
        
        setArticles(response.data.items);
        
      } catch (err) {
        setError('Erro ao carregar receitas populares.');
        console.error('Erro ao buscar artigos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [pageSize]);

  return {
    articles,
    loading,
    error
  };
};

export default usePopularArticles;
export type { Article, Author };
