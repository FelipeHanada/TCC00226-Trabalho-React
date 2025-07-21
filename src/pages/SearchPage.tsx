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
import Footer from "../components/Footer";
import ProfilePageNavbar from "../components/ProfilePageNavbar";
import usePopularArticles from "../hooks/usePopularArticles";

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
  const { articles, loading, error } = usePopularArticles(6);

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
          <h2 className="mb-4">Receitas Populares</h2>
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
            ) : (
              articles.map((article) => (
                <div className="col-md-4" key={article.id}>
                  <ApiArticleCard article={article} />
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
}
