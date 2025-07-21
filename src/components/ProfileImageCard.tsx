import { useState } from 'react';
import type { User } from '../store/authStore';

interface ProfileImageCardProps {
  user?: User;
}

export default function ProfileImageCard({ user }: ProfileImageCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  if (!user) {
    return (
      <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center">
        <div className="alert alert-warning" role="alert">
          <i className="bi bi-exclamation-triangle"></i> Dados do usuário não disponíveis
        </div>
      </div>
    );
  }

  return (
    <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center">
      <div className="mb-3 position-relative border d-flex justify-content-center align-items-center"
          style={{ borderRadius: "50%", width: "240px", height: "240px", backgroundColor: "#f8f9fa" }}>
        {imageLoading && !imageError && (
          <div className="position-absolute">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando imagem...</span>
            </div>
          </div>
        )}
        
        {imageError || !imageLoading ? (
          <div className="text-center">
            <i className="bi bi-person-circle" style={{ fontSize: "120px", color: "#6c757d" }}></i>
          </div>
        ) : (
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName + ' ' + user.lastName)}&size=240&background=0d6efd&color=fff`}
            alt={`${user.firstName} ${user.lastName}`}
            className="rounded-circle"
            style={{ width: "240px", height: "240px", objectFit: "cover" }}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false);
              setImageError(true);
            }}
          />
        )}
      </div>

      <h2 className="mb-3 text-center">{user.firstName} {user.lastName}</h2>
      
      <div className="w-100" style={{ maxWidth: "350px" }}>
        <div className="card border-0 bg-light">
          <div className="card-body">
            <div className="mb-3">
              <h6 className="text-muted mb-1 d-flex align-items-center">
                <i className="bi bi-envelope me-2"></i> Email
              </h6>
              <a 
                href={`mailto:${user.email}`} 
                className="text-decoration-none fw-medium"
              >
                {user.email}
              </a>
            </div>

            {user.phoneNumber && (
              <div className="mb-3">
                <h6 className="text-muted mb-1 d-flex align-items-center">
                  <i className="bi bi-telephone me-2"></i> Telefone
                </h6>
                <a 
                  href={`tel:${user.phoneNumber}`} 
                  className="text-decoration-none fw-medium"
                >
                  {user.phoneNumber}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
