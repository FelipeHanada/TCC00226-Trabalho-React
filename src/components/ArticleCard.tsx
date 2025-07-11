import type { Article } from '../data/articles';
import { useCartStore } from '../store/cartStore';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id: article.id,
      title: article.title,
      author: article.author,
      image: article.image,
      price: article.price
    });
  };

  return (
    <div className="card h-100 shadow-sm">
      <img 
        src={article.image} 
        className="card-img-top" 
        alt={article.title}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{article.title}</h5>
        <p className="card-text text-muted mb-2">
          <i className="bi bi-person-fill"></i> {article.author}
        </p>
        <p className="card-text flex-grow-1">{article.description}</p>
        
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div className="price-tag">
            <span className="h5 text-success fw-bold">
              R$ {article.price.toFixed(2).replace('.', ',')}
            </span>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleAddToCart}
            title="Adicionar ao carrinho"
          >
            <i className="bi bi-cart-plus"></i> Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
