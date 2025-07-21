import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCurrentUser from '../hooks/useCurrentUser';
import { useAuthStore } from '../store/authStore';
import { formatPrice } from '../utils/priceUtils';

interface CreateArticleData {
  title: string;
  description: string;
  cardImage: string;
  contentMD: string;
  price: string;
}

export default function CreateArticlePage() {
  const { isAuthenticated, token } = useAuthStore();
  const { user, loading: userLoading } = useCurrentUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateArticleData>({
    title: '',
    description: '',
    cardImage: '',
    contentMD: '',
    price: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  if (userLoading) {
    return (
      <div className="container-fluid">
        <div className="row h-100 m-4 border rounded p-3">
          <div className="col-12 d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
              <p className="mt-2 text-muted">Carregando dados do usuário...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container-fluid">
        <div className="row h-100 m-4 border rounded p-3">
          <div className="col-12">
            <div className="alert alert-danger" role="alert">
              <i className="bi bi-exclamation-triangle"></i> Erro ao carregar dados do usuário
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setSubmitError('O título é obrigatório');
      return;
    }
    
    if (!formData.description.trim()) {
      setSubmitError('A descrição é obrigatória');
      return;
    }
    
    if (!formData.contentMD.trim()) {
      setSubmitError('O conteúdo é obrigatório');
      return;
    }

    if (!formData.price.trim() || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) < 0) {
      setSubmitError('O preço deve ser um número válido maior ou igual a zero');
      return;
    }

    if (!user || !token) {
      setSubmitError('Usuário não autenticado');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const articlePayload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        cardImage: formData.cardImage.trim() || null,
        contentMD: formData.contentMD.trim(),
        price: Math.floor(parseFloat(formData.price) * 100), // Converter para centavos
        author: {
          id: user.id
        }
      };

      await axios.post('http://localhost:8080/article', articlePayload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      console.error('Erro ao criar artigo:', error);
      if (axios.isAxiosError(error)) {
        setSubmitError(error.response?.data?.message || 'Erro ao criar artigo');
      } else {
        setSubmitError('Erro inesperado ao criar artigo');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="container-fluid">
        <div className="row h-100 m-4 border rounded p-3">
          <div className="col-12 d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
            <div className="text-center">
              <div className="text-success mb-3">
                <i className="bi bi-check-circle" style={{ fontSize: '3rem' }}></i>
              </div>
              <h4 className="text-success">Artigo criado com sucesso!</h4>
              <p className="text-muted">Redirecionando...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row h-100 m-4 border rounded p-3">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>
              <i className="bi bi-file-earmark-text me-2"></i>
              Criar Novo Artigo
            </h2>
            <button 
              type="button" 
              className="btn btn-outline-secondary"
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
            >
              <i className="bi bi-arrow-left me-1"></i>
              Voltar
            </button>
          </div>

          {submitError && (
            <div className="alert alert-danger mb-4" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {submitError}
            </div>
          )}

          <div className="row">
            <div className="col-lg-8">
              <form onSubmit={handleSubmit}>
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">
                      <i className="bi bi-pencil-square me-2"></i>
                      Informações do Artigo
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Título <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Digite o título do artigo"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Descrição <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows={3}
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Escreva uma breve descrição do artigo"
                        required
                        disabled={isSubmitting}
                      />
                      <div className="form-text">
                        Esta descrição aparecerá no preview do artigo
                      </div>
                    </div>

                    {/* Imagem do Card */}
                    <div className="mb-3">
                      <label htmlFor="cardImage" className="form-label">
                        URL da Imagem de Capa
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        id="cardImage"
                        name="cardImage"
                        value={formData.cardImage}
                        onChange={handleInputChange}
                        placeholder="https://exemplo.com/imagem.jpg"
                        disabled={isSubmitting}
                      />
                      <div className="form-text">
                        URL da imagem que aparecerá no card do artigo (opcional)
                      </div>
                    </div>

                    {/* Preço */}
                    <div className="mb-3">
                      <label htmlFor="price" className="form-label">
                        Preço (R$) <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                        disabled={isSubmitting}
                      />
                      <div className="form-text">
                        Valor em reais para o artigo
                      </div>
                    </div>

                    {/* Conteúdo Markdown */}
                    <div className="mb-3">
                      <label htmlFor="contentMD" className="form-label">
                        Conteúdo (Markdown) <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        id="contentMD"
                        name="contentMD"
                        rows={12}
                        value={formData.contentMD}
                        onChange={handleInputChange}
                        placeholder="Escreva o conteúdo do artigo em Markdown..."
                        required
                        disabled={isSubmitting}
                        style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
                      />
                      <div className="form-text">
                        Use sintaxe Markdown para formatação. Ex: **negrito**, *itálico*, # Título
                      </div>
                    </div>

                    {/* Botões */}
                    <div className="d-flex gap-2 justify-content-end">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => navigate(-1)}
                        disabled={isSubmitting}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="spinner-border spinner-border-sm me-2" role="status">
                              <span className="visually-hidden">Criando...</span>
                            </div>
                            Criando Artigo...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-check-lg me-1"></i>
                            Criar Artigo
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h6 className="card-title mb-0">
                    <i className="bi bi-eye me-2"></i>
                    Preview
                  </h6>
                </div>
                <div className="card-body">
                  <div className="border rounded p-3">
                    <h6 className="fw-bold text-truncate">
                      {formData.title || 'Título do artigo'}
                    </h6>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <p className="text-muted small mb-0">
                        Por: {user.firstName} {user.lastName}
                      </p>
                      {formData.price && (
                        <span className="badge bg-primary">
                          R$ {formatPrice(Math.floor(parseFloat(formData.price) * 100))}
                        </span>
                      )}
                    </div>
                    {formData.cardImage && (
                      <img 
                        src={formData.cardImage} 
                        alt="Preview"
                        className="img-fluid rounded mb-2"
                        style={{ maxHeight: '150px', width: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                    <p className="small text-muted">
                      {formData.description || 'Descrição do artigo aparecerá aqui...'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
