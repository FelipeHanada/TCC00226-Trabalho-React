import { useState } from 'react'
import type { CreateCommentData } from '../interfaces/ArticleComment'
import { useAuthStore } from '../store/authStore'

interface CommentFormProps {
  onSubmit: (commentData: CreateCommentData) => Promise<void>;
  isSubmitting: boolean;
  submitError: string | null;
}

export default function CommentForm({ onSubmit, isSubmitting, submitError }: CommentFormProps) {
  const { isAuthenticated } = useAuthStore();
  const [formData, setFormData] = useState<CreateCommentData>({
    content: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.content.trim()) {
      return;
    }

    try {
      await onSubmit(formData);
      // Limpar o formulário após sucesso
      setFormData({ content: '' });
    } catch {
      // O erro será tratado no componente pai
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="alert alert-info" role="alert">
        <i className="bi bi-info-circle"></i> Faça login para comentar neste artigo.
      </div>
    );
  }

  return (
    <div className="border rounded p-3 mb-3">
      <h6 className="mb-3">
        <i className="bi bi-chat-dots me-2"></i>
        Adicionar Comentário
      </h6>
      
      {submitError && (
        <div className="alert alert-danger mb-3" role="alert">
          <i className="bi bi-exclamation-triangle"></i> {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="commentContent" className="form-label">
            Comentário <span className="text-danger">*</span>
          </label>
          <textarea
            className="form-control"
            id="commentContent"
            name="content"
            rows={4}
            value={formData.content}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="Compartilhe sua opinião sobre este artigo..."
            required
          />
        </div>

        <div className="d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting || !formData.content.trim()}
          >
            {isSubmitting ? (
              <>
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Enviando...</span>
                </div>
                Enviando...
              </>
            ) : (
              <>
                <i className="bi bi-send me-2"></i>
                Comentar
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
