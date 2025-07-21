import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Article } from "../interfaces/Article";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";
import { convertPrice, formatPrice } from "../utils/priceUtils";

interface ApiRecipeCardProps {
  article: Article;
}

export default function ApiRecipeCard({ article }: ApiRecipeCardProps) {
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { user, token } = useAuthStore();
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  const handleCardClick = () => {
    navigate(`/article?article=${article.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    addItem({
      id: article.id.toString(),
      title: article.title,
      author:
        article.author.name ||
        `${article.author.firstName} ${article.author.lastName}`,
      image: article.cardImage!,
      price: convertPrice(article.price),
    });

    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 2000);
  };

  return (
    <div
      className="card h-100"
      style={{ cursor: "pointer" }}
      onClick={handleCardClick}
    >
      <img
        src={article.cardImage}
        className="card-img-top"
        alt={article.title}
        style={{ height: "150px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h6 className="card-title">{article.title}</h6>
        <p className="card-text small text-muted flex-grow-1">
          {article.description.length > 80
            ? `${article.description.substring(0, 80)}...`
            : article.description}
        </p>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <small className="text-success fw-bold">
            R$ {formatPrice(article.price)}
          </small>
          {user && token ? (
            <button
              className={`btn btn-sm ${
                showAddedToCart ? "btn-success" : "btn-primary"
              }`}
              onClick={handleAddToCart}
              title="Adicionar ao carrinho"
              disabled={showAddedToCart}
            >
              <i
                className={`bi ${
                  showAddedToCart ? "bi-check-circle" : "bi-cart-plus"
                }`}
              ></i>
            </button>
          ) : (
            <small className="text-muted" style={{ fontSize: "0.7rem" }}>
              Login para comprar
            </small>
          )}
        </div>
      </div>
    </div>
  );
}
