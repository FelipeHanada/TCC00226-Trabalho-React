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

interface UseHomeArticlesReturn {
  featuredArticle: Article | null;
  sideArticles: Article[];
  loading: boolean;
  error: string | null;
}

const useHomeArticles = (): UseHomeArticlesReturn => {
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
  const [sideArticles, setSideArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Buscar os primeiros 4 artigos
        const response = await axios.get<PageResult<Article>>(
          'http://localhost:8080/article?page=0&pageSize=4'
        );
        
        const articles = response.data.items;
        
        if (articles.length > 0) {
          // Primeiro artigo será o destaque
          setFeaturedArticle(articles[0]);
          
          // Os próximos 3 artigos serão os cards laterais
          setSideArticles(articles.slice(1, 4));
        }
        
      } catch (err) {
        setError('Erro ao carregar artigos para a página inicial.');
        console.error('Erro ao buscar artigos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return {
    featuredArticle,
    sideArticles,
    loading,
    error
  };
};

export default useHomeArticles;
export type { Article, Author };

