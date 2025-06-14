import { useState } from "react"

export interface CommentProps {
  userImage: string
  username: string
  publishedAt: string
  content: string
  replies?: CommentProps[]
}

export default function Comment({
  userImage,
  username,
  publishedAt,
  content,
  replies = [],
}: CommentProps) {
  const [likes, setLikes] = useState(0)
  const [loves, setLoves] = useState(0)

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <div>
          <img className="comment-icon" src={userImage} alt="User" />
          <span className="ms-2">{username}</span>
          <span className="ms-2">Publicado em {publishedAt}</span>
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
        <p className="mb-2">{content}</p>
      </div>

      {replies.length > 0 && (
        <div className="border-start ps-4">
          {replies.map((reply, index) => (
            <Comment key={index} {...reply} />
          ))}
        </div>
      )}
    </div>
  )
}
