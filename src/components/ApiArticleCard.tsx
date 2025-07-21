import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Article } from '../interfaces/Article';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { useFavoritesStore } from '../store/favoritesStore';
import { convertPrice, formatPrice } from '../utils/priceUtils';

interface ApiArticleCardProps {
  article: Article;
}

function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export default function ApiArticleCard({ article }: ApiArticleCardProps) {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite: checkIsFavorite } = useFavoritesStore();
  const { addItem } = useCartStore();
  const { user, token } = useAuthStore();
  const [isToggling, setIsToggling] = useState(false);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  
  const isFavorite = checkIsFavorite(article.id);
  const authorInitials = getInitials(article.author.firstName || '', article.author.lastName || '');
  const authorName = article.author.name || `${article.author.firstName} ${article.author.lastName}`;

  const handleCardClick = () => {
    navigate(`/article?article=${article.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    addItem({
      id: article.id.toString(),
      title: article.title,
      author: authorName,
      image: article.cardImage!,
      price: convertPrice(article.price)
    });
    
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 2000);
  };

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user || !token) {
      navigate('/login');
      return;
    }

    if (isToggling) return;

    try {
      setIsToggling(true);
      if (isFavorite) {
        await removeFromFavorites(article.id, token);
      } else {
        await addToFavorites({
          id: article.id,
          title: article.title,
          description: article.description,
          cardImage: article.cardImage!,
          author: {
            id: article.author.id,
            firstName: article.author.firstName!,
            lastName: article.author.lastName!
          }
        }, token);
      }
    } catch (error) {
      console.error('Erro ao alterar favorito:', error);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className="card h-100" style={{ cursor: 'pointer' }} onClick={handleCardClick}>
      <div className="position-relative">
        <img 
          src={article.cardImage} 
          className="card-img-top" 
          alt={article.title}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <button
          className="btn position-absolute top-0 end-0 m-2 p-2"
          style={{ 
            background: 'rgba(255, 255, 255, 0.9)', 
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={handleFavoriteClick}
          disabled={isToggling}
          title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill={isFavorite ? "#dc3545" : "none"} 
            stroke={isFavorite ? "#dc3545" : "#6c757d"} 
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{article.title}</h5>
        <p className="card-text flex-grow-1">{article.description}</p>
        <div className="d-flex align-items-center mt-auto mb-3">
          <img 
            src={`https://ui-avatars.com/api/?name=${authorInitials}&background=6c757d&color=fff&size=32`}
            alt={authorName}
            className="rounded-circle me-2"
            width="32"
            height="32"
          />
          <small className="text-muted">Por {authorName}</small>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span className="h5 text-success mb-0">R$ {formatPrice(article.price)}</span>
          {user && token ? (
            <button
              className={`btn btn-sm ${showAddedToCart ? 'btn-success' : 'btn-primary'}`}
              onClick={handleAddToCart}
              title="Adicionar ao carrinho"
              disabled={showAddedToCart}
            >
              <i className={`bi ${showAddedToCart ? 'bi-check-circle' : 'bi-cart-plus'} me-1`}></i>
              {showAddedToCart ? 'Adicionado!' : 'Adicionar'}
            </button>
          ) : (
            <small className="text-muted">
              <i className="bi bi-info-circle me-1"></i>
              Faça login para comprar
            </small>
          )}
        </div>
      </div>
    </div>
  );
}
