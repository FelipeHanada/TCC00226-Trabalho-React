import { useState } from "react"
import type { ArticleComment } from '../interfaces/ArticleComment'

export interface CommentProps {
  comment: ArticleComment;
}

export default function Comment({ comment }: CommentProps) {
  const [likes, setLikes] = useState(0)
  const [loves, setLoves] = useState(0)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(',', ' às');
  };

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <div>
          <div className="comment-icon bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center me-2" 
               style={{ width: '32px', height: '32px', fontSize: '14px' }}>
            {comment.author.firstName.charAt(0).toUpperCase()}
          </div>
          <span className="ms-2 fw-semibold">{comment.author.firstName} {comment.author.lastName}</span>
          <span className="ms-2 text-muted small">Publicado em {formatDate(comment.publishedAt)}</span>
        </div>

        <div className="d-flex align-items-center gap-4">
          <div className="d-flex justify-content-end gap-3">
            <div className="d-flex align-items-center">
              <button
                type="button"
                className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2 like-btn"
                onClick={() => setLikes(likes + 1)}
              >
                <i className="fa-regular fa-thumbs-up"></i>
                <span>Gostei</span>
                <span className="like-counter">{likes}</span>
              </button>
            </div>
            <div className="d-flex align-items-center">
              <button
                type="button"
                className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2 love-btn"
                onClick={() => setLoves(loves + 1)}
              >
                <i className="fa-regular fa-heart"></i>
                <span>Amei</span>
                <span className="love-counter">{loves}</span>
              </button>
            </div>
          </div>

          <div className="dropdown dropend">
            <span
              className="d-flex justify-content-center align-items-center"
              role="button"
              data-bs-toggle="dropdown"
            >
              <i className="fa-solid fa-ellipsis-vertical" style={{ fontSize: '16px' }}></i>
            </span>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><a className="dropdown-item" href="#">Reportar usuário</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-3">
        {comment.title && (
          <h6 className="mb-2 fw-bold">{comment.title}</h6>
        )}
        <p className="mb-2">{comment.content}</p>
      </div>
    </div>
  )
}
