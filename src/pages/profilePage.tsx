
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AboutInfoProfileCard from "../components/AboutInfoProfileCard";
import ProfileImageCard from "../components/ProfileImageCard";
import useCurrentUser from "../hooks/useCurrentUser";
import { useAuthStore } from "../store/authStore";

export default function ProfilePage() {
  const { isAuthenticated } = useAuthStore();
  const { user, loading, error, refetch } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="row h-100 m-4 border rounded p-3">
          <div className="col-12 d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando perfil...</span>
              </div>
              <p className="mt-2 text-muted">Carregando suas informações...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid">
        <div className="row h-100 m-4 border rounded p-3">
          <div className="col-12">
            <div className="alert alert-danger" role="alert">
              <i className="bi bi-exclamation-triangle"></i> {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row h-100 m-4 border rounded p-3">
          <ProfileImageCard user={user || undefined} />
          <AboutInfoProfileCard 
            user={user || undefined} 
            onUserUpdate={() => refetch()}
          />
        </div>
      </div>
    </>
  );
}
