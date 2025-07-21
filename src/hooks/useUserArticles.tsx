import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import type { Article, EditFormData } from '../interfaces/Article';
import type { User } from '../store/authStore';
import { useAuthStore } from '../store/authStore';
import { convertPrice } from '../utils/priceUtils';

interface UseUserArticlesReturn {
  articles: Article[];
  articlesLoading: boolean;
  articlesError: string | null;

  editingArticle: Article | null;
  showEditModal: boolean;
  editFormData: EditFormData;
  isUpdating: boolean;
  updateError: string | null;

  showDeleteModal: boolean;
  articleToDelete: Article | null;
  isDeleting: boolean;
  deleteError: string | null;

  refetchArticles: () => void;
  handleEditArticle: (article: Article) => void;
  handleUpdateArticle: () => Promise<void>;
  handleDeleteArticle: (article: Article) => void;
  confirmDeleteArticle: () => Promise<void>;
  handleEditFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setShowEditModal: (show: boolean) => void;
  setShowDeleteModal: (show: boolean) => void;
}

export default function useUserArticles(user?: User): UseUserArticlesReturn {
  const { token } = useAuthStore();
  
  // Estados dos artigos
  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [articlesError, setArticlesError] = useState<string | null>(null);

  // Estados do modal de edição
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState<EditFormData>({
    title: '',
    description: '',
    cardImage: '',
    contentMD: '',
    price: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  // Estados do modal de deleção
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Função para buscar artigos do usuário
  const fetchUserArticles = useCallback(async () => {
    if (!user?.id) return;

    try {
      setArticlesLoading(true);
      setArticlesError(null);
      
      const response = await axios.get(`http://localhost:8080/article/author/${user.id}`);
      setArticles(response.data.items);
    } catch (error) {
      console.error('Erro ao buscar artigos:', error);
      if (axios.isAxiosError(error)) {
        setArticlesError(error.response?.data?.message || 'Erro ao carregar artigos');
      } else {
        setArticlesError('Erro inesperado ao carregar artigos');
      }
    } finally {
      setArticlesLoading(false);
    }
  }, [user?.id]);

  // Função para recarregar artigos (para uso externo)
  const refetchArticles = () => {
    fetchUserArticles();
  };

  // Carregar artigos quando o usuário mudar
  useEffect(() => {
    fetchUserArticles();
  }, [fetchUserArticles]);

  // Função para abrir modal de edição
  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setEditFormData({
      title: article.title,
      description: article.description,
      cardImage: article.cardImage || '',
      contentMD: article.contentMD,
      price: convertPrice(article.price).toString()
    });
    setUpdateError(null);
    setShowEditModal(true);
  };

  // Função para atualizar artigo
  const handleUpdateArticle = async () => {
    if (!editingArticle || !user || !token) return;

    try {
      setIsUpdating(true);
      setUpdateError(null);

      const updatedArticle = {
        id: editingArticle.id,
        title: editFormData.title.trim(),
        description: editFormData.description.trim(),
        cardImage: editFormData.cardImage.trim() || null,
        contentMD: editFormData.contentMD.trim(),
        price: Math.floor(parseFloat(editFormData.price) * 100) || 0,
        author: {
          id: user.id
        }
      };


      await axios.patch(`http://localhost:8080/article`, updatedArticle, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
      });

      const response = await axios.get(`http://localhost:8080/article/author/${user.id}`);
      setArticles(response.data.items);

      setShowEditModal(false);
      setEditingArticle(null);
    } catch (error) {
      console.error('Erro ao atualizar artigo:', error);
      if (axios.isAxiosError(error)) {
        setUpdateError(error.response?.data?.message || 'Erro ao atualizar artigo');
      } else {
        setUpdateError('Erro inesperado ao atualizar artigo');
      }
    } finally {
      setIsUpdating(false);
    }
  };

  // Função para abrir modal de deleção
  const handleDeleteArticle = (article: Article) => {
    setArticleToDelete(article);
    setDeleteError(null);
    setShowDeleteModal(true);
  };

  // Função para confirmar deleção
  const confirmDeleteArticle = async () => {
    if (!articleToDelete || !user || !token) return;

    try {
      setIsDeleting(true);
      setDeleteError(null);

      await axios.delete(`http://localhost:8080/article/${articleToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const response = await axios.get(`http://localhost:8080/article/author/${user.id}`);
      setArticles(response.data.items);

      // Fechar ambos os modais
      setShowDeleteModal(false);
      setShowEditModal(false);
      setArticleToDelete(null);
      setEditingArticle(null);
    } catch (error) {
      console.error('Erro ao deletar artigo:', error);
      if (axios.isAxiosError(error)) {
        setDeleteError(error.response?.data?.message || 'Erro ao deletar artigo');
      } else {
        setDeleteError('Erro inesperado ao deletar artigo');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  // Função para gerenciar mudanças no formulário
  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return {
    // Estados dos artigos
    articles,
    articlesLoading,
    articlesError,

    // Estados do modal de edição
    editingArticle,
    showEditModal,
    editFormData,
    isUpdating,
    updateError,

    // Estados do modal de deleção
    showDeleteModal,
    articleToDelete,
    isDeleting,
    deleteError,

    // Funções
    refetchArticles,
    handleEditArticle,
    handleUpdateArticle,
    handleDeleteArticle,
    confirmDeleteArticle,
    handleEditFormChange,
    setShowEditModal,
    setShowDeleteModal,
  };
}
