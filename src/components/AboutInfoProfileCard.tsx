import axios from 'axios';
import { useRef, useState } from 'react';
import type { User } from '../store/authStore';
import { useAuthStore } from '../store/authStore';

interface AboutInfoProfileCardProps {
  user?: User;
  onUserUpdate?: (updatedUser: User) => void;
}

export default function AboutInfoProfileCard({ user, onUserUpdate }: AboutInfoProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(user?.aboutMe || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { setUser: setAuthUser } = useAuthStore();

  const handleEditClick = () => {
    setIsEditing(true);
    setDescription(user?.aboutMe || '');
    setSaveError(null);
    
    // Focar no textarea após renderização
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

      // Atualizar o estado local e o store
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
    </div>
  );
}
