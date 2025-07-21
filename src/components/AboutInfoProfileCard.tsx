import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import useUserArticles from '../hooks/useUserArticles';
import type { User } from '../store/authStore';
import { useAuthStore } from '../store/authStore';

interface AboutInfoProfileCardProps {
  user?: User;
  onUserUpdate?: (updatedUser: User) => void;
}

export default function AboutInfoProfileCard({ user, onUserUpdate }: AboutInfoProfileCardProps) {
  // Estados para edição da descrição
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(user?.aboutMe || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { setUser: setAuthUser } = useAuthStore();

  // Hook para gerenciar artigos do usuário
  const {
    articles,
    articlesLoading,
    articlesError,
    editingArticle,
    showEditModal,
    editFormData,
    isUpdating,
    updateError,
    showDeleteModal,
    articleToDelete,
    isDeleting,
    deleteError,
    handleEditArticle,
    handleUpdateArticle,
    handleDeleteArticle,
    confirmDeleteArticle,
    handleEditFormChange,
    setShowEditModal,
    setShowDeleteModal,
  } = useUserArticles(user);

  useEffect(() => {
    setDescription(user?.aboutMe || '');
  }, [user?.aboutMe]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(textareaRef.current.value.length, textareaRef.current.value.length);
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
    setDescription(user?.aboutMe || '');
    setSaveError(null);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.select();
      }
    }, 100);
  };

  const handleSaveDescription = async () => {
    if (!user) return;

    try {
      setIsSaving(true);
      setSaveError(null);

      const updatedUser = {
        ...user,
        aboutMe: description.trim()
      };

      const response = await axios.patch('http://localhost:8080/user', updatedUser, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const savedUser = response.data;
      setAuthUser(savedUser);
      
      if (onUserUpdate) {
        onUserUpdate(savedUser);
      }

      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao salvar descrição:', error);
      if (axios.isAxiosError(error)) {
        setSaveError(error.response?.data?.message || 'Erro ao salvar descrição');
      } else {
        setSaveError('Erro inesperado ao salvar descrição');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleBlur = () => {
    if (!isSaving) {
      handleSaveDescription();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      setDescription(user?.aboutMe || '');
      setIsEditing(false);
      setSaveError(null);
    }
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSaveDescription();
    }
  };

  if (!user) {
    return (
      <div className="col-lg-6 d-flex flex-column align-items-center overflow-auto" style={{ maxHeight: "80vh" }}>
        <div className="card rounded border mb-3 w-100">
          <div className="card-body">
            <div className="alert alert-warning" role="alert">
              <i className="bi bi-exclamation-triangle"></i> Dados do usuário não disponíveis
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="col-lg-6 d-flex flex-column align-items-center overflow-auto" style={{ maxHeight: "80vh" }}>
        <div className="card rounded border mb-3 w-100">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">
              <span className="me-2"><i className="bi bi-person-lines-fill"></i></span>
              Sobre Mim
            </h5>

            <button 
              className="btn btn-outline-secondary btn-sm"
              onClick={handleEditClick}
              disabled={isEditing || isSaving}
              title="Editar descrição"
            >
              {isSaving ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Salvando...</span>
                </div>
              ) : (
                <i className="bi bi-pencil"></i>
              )}
            </button>
          </div>
          <div className="card-body">
            {saveError && (
              <div className="alert alert-danger alert-sm mb-3" role="alert">
                <i className="bi bi-exclamation-triangle"></i> {saveError}
              </div>
            )}

            {isEditing ? (
              <div>
                <textarea
                  ref={textareaRef}
                  className="form-control"
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  placeholder="Conte um pouco sobre você..."
                  disabled={isSaving}
                  style={{ resize: 'vertical', minHeight: '120px' }}
                />
                <small className="text-muted mt-2 d-block">
                  <i className="bi bi-info-circle"></i> Pressione Ctrl+Enter para salvar ou Esc para cancelar
                </small>
              </div>
            ) : (
              <div>
                {user.aboutMe && user.aboutMe.trim() ? (
                  <p className="card-text" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                    {user.aboutMe}
                  </p>
                ) : (
                  <div className="text-center text-muted py-4">
                    <i className="bi bi-chat-text" style={{ fontSize: '2rem', opacity: 0.5 }}></i>
                    <p className="mt-2 mb-0">
                      Você ainda não adicionou uma descrição sobre si.
                    </p>
                    <small>
                      Clique no ícone do lápis para adicionar informações sobre você!
                    </small>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="card rounded border w-100">
          <div className="card-header">
            <h5 className="card-title mb-0">
              <span className="me-2"><i className="bi bi-file-earmark-text"></i></span>
              Meus Artigos
            </h5>
          </div>
          <div className="card-body">
            {articlesLoading ? (
              <div className="text-center py-3">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Carregando artigos...</span>
                </div>
                <p className="mt-2 text-muted">Carregando seus artigos...</p>
              </div>
            ) : articlesError ? (
              <div className="alert alert-warning" role="alert">
                <i className="bi bi-exclamation-triangle"></i> {articlesError}
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center text-muted py-4">
                <i className="bi bi-file-earmark-plus" style={{ fontSize: '2rem', opacity: 0.5 }}></i>
                <p className="mt-2 mb-0">
                  Você ainda não criou nenhum artigo.
                </p>
                <small>
                  Comece criando seu primeiro artigo!
                </small>
              </div>
            ) : (
              <div className="list-group list-group-flush">
                {articles.map((article) => (
                  <div key={article.id} className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="me-auto">
                      <div className="fw-bold text-truncate" style={{ maxWidth: '300px' }}>
                        {article.title}
                      </div>
                      <p className="mb-1 text-muted small text-truncate" style={{ maxWidth: '400px' }}>
                        {article.description}
                      </p>
                      <small className="text-muted">
                        <i className="bi bi-calendar3"></i> {new Date(article.publishedAt).toLocaleDateString('pt-BR')}
                      </small>
                    </div>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleEditArticle(article)}
                      title="Editar artigo"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Edição de Artigo */}
      {showEditModal && editingArticle && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-pencil-square me-2"></i>
                  Editar Artigo
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                  disabled={isUpdating}
                ></button>
              </div>
              <div className="modal-body">
                {updateError && (
                  <div className="alert alert-danger mb-3" role="alert">
                    <i className="bi bi-exclamation-triangle"></i> {updateError}
                  </div>
                )}

                <form>
                  <div className="mb-3">
                    <label htmlFor="editTitle" className="form-label">
                      Título <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editTitle"
                      name="title"
                      value={editFormData.title}
                      onChange={handleEditFormChange}
                      disabled={isUpdating}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="editDescription" className="form-label">
                      Descrição <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      id="editDescription"
                      name="description"
                      rows={3}
                      value={editFormData.description}
                      onChange={handleEditFormChange}
                      disabled={isUpdating}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="editCardImage" className="form-label">
                      URL da Imagem de Capa
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      id="editCardImage"
                      name="cardImage"
                      value={editFormData.cardImage}
                      onChange={handleEditFormChange}
                      disabled={isUpdating}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="editContentMD" className="form-label">
                      Conteúdo (Markdown) <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      id="editContentMD"
                      name="contentMD"
                      rows={8}
                      value={editFormData.contentMD}
                      onChange={handleEditFormChange}
                      disabled={isUpdating}
                      style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteArticle(editingArticle)}
                  disabled={isUpdating}
                >
                  <i className="bi bi-trash"></i> Deletar
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                  disabled={isUpdating}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateArticle}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <>
                      <div className="spinner-border spinner-border-sm me-2" role="status">
                        <span className="visually-hidden">Atualizando...</span>
                      </div>
                      Atualizando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-lg me-1"></i>
                      Salvar Alterações
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Deleção */}
      {showDeleteModal && articleToDelete && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Confirmar Deleção
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={isDeleting}
                ></button>
              </div>
              <div className="modal-body">
                {deleteError && (
                  <div className="alert alert-danger mb-3" role="alert">
                    <i className="bi bi-exclamation-triangle"></i> {deleteError}
                  </div>
                )}
                <p>
                  Tem certeza que deseja deletar o artigo{' '}
                  <strong>"{articleToDelete.title}"</strong>?
                </p>
                <p className="text-muted small">
                  Esta ação não pode ser desfeita.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={isDeleting}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDeleteArticle}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <div className="spinner-border spinner-border-sm me-2" role="status">
                        <span className="visually-hidden">Deletando...</span>
                      </div>
                      Deletando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-trash me-1"></i>
                      Deletar
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
