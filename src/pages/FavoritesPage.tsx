import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { useFavoritesStore } from '../store/favoritesStore';

interface FavoriteItem {
  id: number;
  title: string;
  description: string;
  cardImage: string;
  author: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

export default function FavoritesPage() {
  const { favorites, loading, error, loadFavorites, removeFromFavorites, clearFavorites } = useFavoritesStore();
  const { isAuthenticated, token } = useAuthStore();
  const { items: cartItems, getItemSubtotal, updateQuantity, addItem, removeItem } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && isAuthenticated) {
      loadFavorites(token);
    }
  }, [token, isAuthenticated, loadFavorites]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleRemoveFavorite = async (id: number) => {
    if (!token) return;
    
    try {
      await removeFromFavorites(id, token);
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
    }
  };

  const handleClearFavorites = () => {
    clearFavorites();
  };

  const getCartInfoForFavorite = (favoriteId: number) => {
    const cartItem = cartItems.find(item => item.id === favoriteId.toString());
    return {
      quantity: cartItem?.quantity || 0,
      subtotal: cartItem ? getItemSubtotal(cartItem.id) : 0
    };
  };

  const handleAddToCart = (favorite: FavoriteItem) => {
    addItem({
      id: favorite.id.toString(),
      title: favorite.title,
      author: `${favorite.author.firstName} ${favorite.author.lastName}`,
      image: favorite.cardImage,
      price: 29.99
    });
  };

  const handleRemoveFromCart = (favoriteId: number) => {
    removeItem(favoriteId.toString());
  };

  const handleQuantityChange = (favoriteId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(favoriteId);
    } else {
      updateQuantity(favoriteId.toString(), quantity);
    }
  };

  // Componente para input de quantidade
  const QuantityInput = ({ favorite }: { favorite: FavoriteItem }) => {
    const cartInfo = getCartInfoForFavorite(favorite.id);
    const [quantity, setQuantity] = useState<string>(cartInfo.quantity.toString());
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      setQuantity(cartInfo.quantity.toString());
    }, [cartInfo.quantity]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuantity(value);
      
      const newQuantity = parseInt(value);
      if (!isNaN(newQuantity) && newQuantity >= 0) {
        if (newQuantity === 0) {
          handleRemoveFromCart(favorite.id);
        } else {
          if (cartInfo.quantity === 0) {
            // Se não estava no carrinho, adiciona primeiro
            handleAddToCart(favorite);
          }
          handleQuantityChange(favorite.id, newQuantity);
        }
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();
      
      if (value === '' || parseInt(value) < 0 || isNaN(parseInt(value))) {
        setQuantity(cartInfo.quantity.toString());
        return;
      }
      
      const numValue = parseInt(value);
      setQuantity(numValue.toString());
      
      if (numValue === 0) {
        handleRemoveFromCart(favorite.id);
      } else {
        if (cartInfo.quantity === 0) {
          handleAddToCart(favorite);
        }
        handleQuantityChange(favorite.id, numValue);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.currentTarget.blur();
      }
    };

    return (
      <div className="d-flex justify-content-center">
        <input
          ref={inputRef}
          type="number"
          className="form-control text-center"
          style={{ width: '80px' }}
          value={quantity}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          min="0"
          placeholder="0"
        />
      </div>
    );
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando favoritos...</span>
            </div>
            <p className="mt-2 text-muted">Carregando seus favoritos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle"></i> {error}
        </div>
      </div>
    );
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
                onClick={handleClearFavorites}
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
                <div className="col-md-2">
                  <strong>Autor</strong>
                </div>
                <div className="col-md-2 text-center">
                  <strong>Qtd. no Carrinho</strong>
                </div>
                <div className="col-md-2 text-center">
                  <strong>Subtotal</strong>
                </div>
                <div className="col-md-1 text-center">
                  <strong>Remover</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de favoritos */}
          {favorites.map((favorite) => {
            const cartInfo = getCartInfoForFavorite(favorite.id);
            return (
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
                    <div className="col-md-2">
                      <p className="mb-0">
                        <strong>{favorite.author.firstName} {favorite.author.lastName}</strong>
                      </p>
                      <small className="text-muted">Chef</small>
                    </div>
                    <div className="col-md-2 text-center">
                      <QuantityInput favorite={favorite} />
                    </div>
                    <div className="col-md-2 text-center">
                      {cartInfo.quantity > 0 ? (
                        <span className="fw-bold text-success">
                          R$ {cartInfo.subtotal.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-muted">R$ 0,00</span>
                      )}
                    </div>
                    <div className="col-md-1 text-center">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleRemoveFavorite(favorite.id)}
                        title="Remover dos favoritos"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Resumo */}
          <div className="row mt-4">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-info-circle text-info"></i> Resumo
                  </h5>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <p className="card-text">
                        <strong>Total de receitas favoritas:</strong> {favorites.length}
                      </p>
                      <p className="card-text">
                        <strong>Favoritos no carrinho:</strong> {favorites.filter(fav => getCartInfoForFavorite(fav.id).quantity > 0).length}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="card-text">
                        <strong>Valor total dos favoritos no carrinho:</strong> 
                        <span className="text-success fw-bold ms-2">
                          R$ {favorites.reduce((total, fav) => total + getCartInfoForFavorite(fav.id).subtotal, 0).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
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
                    {favorites.some(fav => getCartInfoForFavorite(fav.id).quantity > 0) && (
                      <button 
                        className="btn btn-success"
                        onClick={() => navigate('/cart')}
                      >
                        <i className="bi bi-cart"></i> Ver Carrinho
                      </button>
                    )}
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
