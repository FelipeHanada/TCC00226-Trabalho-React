import ApiArticleCard from '../components/ApiArticleCard';
import useInfiniteArticles from '../hooks/useInfiniteArticles';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

export default function ArticlesPage() {
  const { articles, loading, loadingMore, error, hasNextPage, loadMore } = useInfiniteArticles(12);
  
  useInfiniteScroll(loadMore, {
    hasNextPage,
    loading: loadingMore,
    threshold: 300
  });

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando artigos...</span>
          </div>
          <p className="mt-2 text-muted">Carregando artigos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="row">
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
      <div className="container mt-4">
        <div className="row">
          <div className="col-12 mb-4">
            <h2 className="fw-bold">
              <i className="bi bi-book-fill"></i> Receitas Disponíveis
            </h2>
            <p className="text-muted">
              Descubra receitas exclusivas dos nossos chefs e adicione-as ao seu carrinho!
            </p>
            <small className="text-muted">
              Total de artigos: {articles.length}
            </small>
          </div>
        </div>

        {articles.length === 0 ? (
          <div className="row">
            <div className="col-12 text-center">
              <div className="alert alert-info">
                <i className="bi bi-info-circle"></i> Nenhum artigo encontrado.
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            {articles.map((article) => (
              <div key={article.id} className="col-md-6 col-lg-4 col-xl-3 mb-4">
                <ApiArticleCard article={article} />
              </div>
            ))}
          </div>
        )}

        {loadingMore && (
          <div className="row mt-4">
            <div className="col-12 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando mais artigos...</span>
              </div>
              <p className="mt-2 text-muted">Carregando mais artigos...</p>
            </div>
          </div>
        )}

        {hasNextPage && !loadingMore && (
          <div className="row mt-4">
            <div className="col-12 text-center">
              <button 
                className="btn btn-primary btn-lg"
                onClick={loadMore}
                disabled={loading}
              >
                <i className="bi bi-arrow-down-circle"></i> Carregar mais artigos
              </button>
              <p className="mt-2 text-muted small">
                Ou role para baixo para carregar automaticamente
              </p>
            </div>
          </div>
        )}

        {!hasNextPage && articles.length > 0 && (
          <div className="row mt-4">
            <div className="col-12 text-center">
              <div className="alert alert-info">
                <i className="bi bi-info-circle"></i> Todos os artigos foram carregados.
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
