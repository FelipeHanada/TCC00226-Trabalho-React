import carnesImg from "../assets/images/carnes.png";
import massasImg from "../assets/images/massas.png";
import pave from "../assets/images/pave.png";
import pudimChocolate from "../assets/images/pudim-chocolate.png";
import saladasImg from "../assets/images/saladas.png";
import sobremesasImg from "../assets/images/sobremesas.png";
import tortaLimao from "../assets/images/torta-limao.png";
import ApiArticleCard from "../components/ApiArticleCard";
import Carousel, { type CarouselItem } from "../components/Carousel";
import CategoryCard, {
  type CategoryCardProps,
} from "../components/CategoryCard";
import Pagination from "../components/Pagination";
import usePopularArticlesPaginated from "../hooks/usePopularArticlesPaginated";

const carouselItems: CarouselItem[] = [
  {
    src: pudimChocolate,
    alt: "Receita 1",
    captionTitle: "Receita Especial da Semana",
    captionText: "Experimente nossos pratos incríveis!",
  },
  {
    src: pave,
    alt: "Receita 2",
  },
  {
    src: tortaLimao,
    alt: "Receita 3",
  },
];

const categories: CategoryCardProps[] = [
  { image: saladasImg, alt: "Saladas", title: "Saladas" },
  { image: sobremesasImg, alt: "Sobremesas", title: "Sobremesas" },
  { image: carnesImg, alt: "Carnes", title: "Carnes" },
  { image: massasImg, alt: "Massas", title: "Massas" },
];

export default function SearchPage() {
  const {
    articles,
    loading,
    error,
    currentPage,
    numberOfPages,
    totalElements,
    goToPage,
  } = usePopularArticlesPaginated(6);

  return (
    <>
      <Carousel items={carouselItems} />
      <main className="container w-100 d-flex flex-column justify-content-center align-items-center">
        <section className="container my-5">
          <h2 className="mb-4">Categorias</h2>
          <div className="row g-4">
            {categories.map((category, index) => (
              <div className="col-6 col-md-3" key={index}>
                <CategoryCard {...category} />
              </div>
            ))}
          </div>
        </section>

        <section className="container my-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Receitas Populares</h2>
            {totalElements > 0 && (
              <small className="text-muted">
                {totalElements} receita{totalElements !== 1 ? "s" : ""}{" "}
                encontrada{totalElements !== 1 ? "s" : ""}
              </small>
            )}
          </div>
          <div className="row g-4">
            {loading ? (
              <div className="col-12 text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">
                    Carregando receitas...
                  </span>
                </div>
                <p className="mt-3">Carregando receitas populares...</p>
              </div>
            ) : error ? (
              <div className="col-12">
                <div className="alert alert-danger" role="alert">
                  <i className="bi bi-exclamation-triangle"></i> {error}
                </div>
              </div>
            ) : articles.length === 0 ? (
              <div className="col-12 text-center">
                <div className="alert alert-info" role="alert">
                  <i className="bi bi-info-circle"></i> Nenhuma receita
                  encontrada.
                </div>
              </div>
            ) : (
              <>
                {articles.map((article) => (
                  <div className="col-md-4" key={article.id}>
                    <ApiArticleCard article={article} />
                  </div>
                ))}
              </>
            )}
          </div>

          {!loading && !error && articles.length > 0 && (
            <div className="mt-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <small className="text-muted">
                  Página {currentPage + 1} de {numberOfPages} • Total:{" "}
                  {totalElements} receitas
                </small>
              </div>

              {numberOfPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  numberOfPages={numberOfPages}
                  onPageChange={goToPage}
                  loading={loading}
                  maxVisiblePages={5}
                />
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
