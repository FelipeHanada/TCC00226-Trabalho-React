import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Article } from '../interfaces/Article';

interface UseHomeArticleReturn {
  currentArticle: Article | null;
  sideArticles: Article[];
  loading: boolean;
  error: string | null;
  isSpecificArticle: boolean;
}

const useHomeArticle = (): UseHomeArticleReturn => {
  const [searchParams] = useSearchParams();
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [sideArticles, setSideArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const articleId = searchParams.get('article');
  const isSpecificArticle = !!articleId;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        if (articleId) {
          const response = await axios.get<Article>(`http://localhost:8080/article/${articleId}`);
          setCurrentArticle(response.data);
          
          const sideResponse = await axios.get<{items: Article[]}>(`http://localhost:8080/article?page=0&pageSize=6`);
          setSideArticles(sideResponse.data.items.filter(article => article.id !== parseInt(articleId)).slice(0, 3));
        } else {
          const response = await axios.get<{items: Article[]}>(`http://localhost:8080/article?page=0&pageSize=6`);
          const articles = response.data.items;
          
          if (articles.length > 0) {
            setCurrentArticle(articles[0]);
            setSideArticles(articles.slice(1, 4));
          }
        }
        
      } catch (err) {
        setError('Erro ao carregar artigos.');
        console.error('Erro ao buscar artigos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [articleId]);

  return {
    currentArticle,
    sideArticles,
    loading,
    error,
    isSpecificArticle
  };
};

export default useHomeArticle;
