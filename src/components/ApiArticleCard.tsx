import heartFillIcon from '../assets/images/heart-fill.svg';
import heartIcon from '../assets/images/heart.svg';
import type { Article } from '../hooks/useArticles';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { useFavoritesStore } from '../store/favoritesStore';

interface ApiArticleCardProps {
  article: Article;
}

export default function ApiArticleCard({ article }: ApiArticleCardProps) {
  const { addItem } = useCartStore();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesStore();
  const { isAuthenticated } = useAuthStore();

  const handleAddToCart = () => {
    addItem({
      id: article.id.toString(),
      title: article.title,
      author: `${article.author.firstName} ${article.author.lastName}`,
      image: article.cardImage || '',
      price: 29.99
    });
  };

  const handleToggleFavorite = () => {
    if (isFavorite(article.id)) {
      removeFromFavorites(article.id);
    } else {
      addToFavorites({
        id: article.id,
        title: article.title,
        description: article.description,
        cardImage: article.cardImage,
        author: {
          id: article.author.id,
          firstName: article.author.firstName,
          lastName: article.author.lastName
        }
      });
    }
  };

  return (
    <div className="card h-100 shadow-sm position-relative">
      {isAuthenticated && (
        <a
          href="#"
          className="position-absolute top-0 end-0 p-2 d-flex flex-column justify-content-start"
          style={{ zIndex: 10 }}
          onClick={(e) => {
            e.preventDefault();
            handleToggleFavorite();
          }}
          title={isFavorite(article.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <img
            src={isFavorite(article.id) ? heartFillIcon : heartIcon}
            alt="Favoritar"
            width="20"
            height="20"
          />
        </a>
      )}
      <img 
        src={article.cardImage || ''} 
        className="card-img-top" 
        alt={article.title}
        style={{ height: '200px', objectFit: 'cover' }}
        onError={(e) => {
          e.currentTarget.src = '';
        }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{article.title}</h5>
        <p className="card-text text-muted flex-grow-1">
          {article.description}
        </p>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <small className="text-muted">
              Por: {article.author.firstName} {article.author.lastName}
            </small>
            <span className="badge bg-success">
              R$ 29,99
            </span>
          </div>
          <button 
            className="btn btn-primary w-100"
            onClick={handleAddToCart}
          >
            <i className="bi bi-cart-plus"></i> Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
