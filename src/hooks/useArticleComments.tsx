import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import type { ArticleComment, CreateCommentData } from '../interfaces/ArticleComment';
import { useAuthStore } from '../store/authStore';

interface PageResult<T> {
  items: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

interface UseArticleCommentsReturn {
  comments: ArticleComment[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  isCreating: boolean;
  createError: string | null;
  loadMore: () => void;
  refetch: () => void;
  createComment: (commentData: CreateCommentData) => Promise<void>;
}

export default function useArticleComments(articleId?: number): UseArticleCommentsReturn {
  const { token } = useAuthStore();
  const [comments, setComments] = useState<ArticleComment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const pageSize = 10;

  const fetchComments = useCallback(async (page: number = 0, append: boolean = false) => {
    if (!articleId) return;

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get<PageResult<ArticleComment>>(
        `http://localhost:8080/article/comment/${articleId}?page=${page}&pageSize=${pageSize}`
      );

      const newComments = response.data.items;
      
      if (append) {
        setComments(prev => [...prev, ...newComments]);
      } else {
        setComments(newComments);
      }

      setHasMore(page < response.data.totalPages - 1);
      setCurrentPage(page);
    } catch (error) {
      console.error('Erro ao carregar comentários:', error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Erro ao carregar comentários');
      } else {
        setError('Erro inesperado ao carregar comentários');
      }
    } finally {
      setLoading(false);
    }
  }, [articleId, pageSize]);

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      fetchComments(currentPage + 1, true);
    }
  }, [hasMore, loading, currentPage, fetchComments]);

  const refetch = useCallback(() => {
    setCurrentPage(0);
    setHasMore(true);
    fetchComments(0, false);
  }, [fetchComments]);

  const createComment = useCallback(async (commentData: CreateCommentData) => {
    if (!articleId || !token) {
      setCreateError('Usuário não autenticado ou artigo não selecionado');
      return;
    }

    try {
      setIsCreating(true);
      setCreateError(null);

      const commentPayload = {
        content: commentData.content.trim(),
        publishedAt: new Date().toISOString()
      };

      await axios.post(
        `http://localhost:8080/article/comment/${articleId}`,
        commentPayload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`
          }
        }
      );

      // Recarregar comentários após criar um novo
      refetch();
    } catch (error) {
      console.error('Erro ao criar comentário:', error);
      if (axios.isAxiosError(error)) {
        setCreateError(error.response?.data?.message || 'Erro ao criar comentário');
      } else {
        setCreateError('Erro inesperado ao criar comentário');
      }
    } finally {
      setIsCreating(false);
    }
  }, [articleId, token, refetch]);

  useEffect(() => {
    if (articleId) {
      fetchComments(0, false);
    }
  }, [fetchComments, articleId]);

  return {
    comments,
    loading,
    error,
    hasMore,
    isCreating,
    createError,
    loadMore,
    refetch,
    createComment
  };
}
