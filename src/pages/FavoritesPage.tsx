import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useFavoritesStore } from '../store/favoritesStore';

export default function FavoritesPage() {
  const { favorites, removeFromFavorites, clearFavorites } = useFavoritesStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // Redirecionar se não estiver logado
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">
              <i className="bi bi-heart-fill text-danger"></i> Lista de Favoritos
            </h2>
            {favorites.length > 0 && (
              <button 
                className="btn btn-outline-danger"
                onClick={clearFavorites}
              >
                <i className="bi bi-trash"></i> Limpar Favoritos
              </button>
            )}
          </div>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="row">
          <div className="col-12 text-center">
            <div className="alert alert-info">
              <i className="bi bi-heart"></i> Sua lista de favoritos está vazia.
              <br />
              <small>Explore nossas receitas e adicione suas favoritas!</small>
            </div>
            <button 
              className="btn btn-primary mt-3"
              onClick={() => navigate('/articles')}
            >
              <i className="bi bi-book"></i> Explorar Receitas
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Cabeçalho da tabela */}
          <div className="row mb-3">
            <div className="col-12">
              <div className="row bg-light p-3 rounded">
                <div className="col-md-2 text-center">
                  <strong>Imagem</strong>
                </div>
                <div className="col-md-3">
                  <strong>Receita</strong>
                </div>
                <div className="col-md-3">
                  <strong>Autor</strong>
                </div>
                <div className="col-md-3">
                  <strong>Descrição</strong>
                </div>
                <div className="col-md-1 text-center">
                  <strong>Remover</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de favoritos */}
          {favorites.map((favorite) => (
            <div key={favorite.id} className="row mb-3">
              <div className="col-12">
                <div className="row align-items-center border rounded p-3">
                  <div className="col-md-2 text-center">
                    <img
                      src={favorite.cardImage}
                      alt={favorite.title}
                      className="img-fluid rounded"
                      style={{ maxWidth: '80px', maxHeight: '80px', objectFit: 'cover' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/src/assets/images/pudim.png';
                      }}
                    />
                  </div>
                  <div className="col-md-3">
                    <h5 className="mb-1">{favorite.title}</h5>
                    <small className="text-muted">ID: #{favorite.id}</small>
                  </div>
                  <div className="col-md-3">
                    <p className="mb-0">
                      <strong>{favorite.author.firstName} {favorite.author.lastName}</strong>
                    </p>
                    <small className="text-muted">Chef</small>
                  </div>
                  <div className="col-md-3">
                    <p className="mb-0 text-muted small">
                      {favorite.description.length > 100 
                        ? `${favorite.description.substring(0, 100)}...` 
                        : favorite.description}
                    </p>
                  </div>
                  <div className="col-md-1 text-center">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeFromFavorites(favorite.id)}
                      title="Remover dos favoritos"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Resumo */}
          <div className="row mt-4">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-info-circle text-info"></i> Resumo
                  </h5>
                  <p className="card-text">
                    <strong>Total de receitas favoritas:</strong> {favorites.length}
                  </p>
                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-primary"
                      onClick={() => navigate('/articles')}
                    >
                      <i className="bi bi-plus-circle"></i> Adicionar mais receitas
                    </button>
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => navigate('/')}
                    >
                      <i className="bi bi-house"></i> Voltar ao início
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
