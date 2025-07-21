import { useNavigate } from "react-router-dom";
import cookieImg from "../assets/images/cookie.png";
import pudimImg from "../assets/images/pudim.png";
import slide1Img from "../assets/images/slide1.png";
import slide2Img from "../assets/images/slide2.png";
import { default as slide3Img } from "../assets/images/tortamorango.png";
import ApiRecipeCard from "../components/ApiRecipeCard";
import Breadcrumb from "../components/Breadcumb";
import type { CarouselItem } from "../components/Carousel";
import Carousel from "../components/Carousel";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
import type { RecipeCardProps } from "../components/RecipeCard";
import RecipeCard from "../components/RecipeCard";
import RecipeSection from "../components/RecipeSectionProps";
import RecipeSidebarNav from "../components/RecipeSideBarNav";
import useArticleComments from "../hooks/useArticleComments";
import useHomeArticle from "../hooks/useHomeArticle";
import { useAuthStore } from "../store/authStore";

const carouselItems: CarouselItem[] = [
  {
    src: slide1Img,
    alt: "Slide 1 - Salada de frutas",
    captionTitle: "Café da Manhã Feliz?",
    captionText:
      "Acorde todas as manhãs com uma boa receita de salada de frutas!",
  },
  {
    src: slide2Img,
    alt: "Slide 2 - Fettuccine Alfredo",
    captionTitle: "Jantar à luz de velas?",
    captionText:
      "Que tal surpreender quem é especial para você com uma boa receita de Fettuccine Alfredo?",
  },
  {
    src: slide3Img,
    alt: "Slide 3 - Sopa de abóbora",
    captionTitle: "Nada melhor em uma tarde do que uma sopa...",
    captionText:
      "Experimente esta receita de sopa cremosa de abóbora com um toque de gengibre. Perfeita para aquecer as tardes mais frias!",
  },
];

const navItems = [
  { label: "Descrição", href: "#descricao" },
  { label: "Receita Completa", href: "#conteudo" },
];

const sideRecipes: RecipeCardProps[] = [
  {
    image: pudimImg,
    title: "Pudim de Leite Condensado Perfeito",
    description:
      "O clássico pudim lisinho e sem furinhos, com uma calda dourada e caramelizada no ponto certo. Aprenda o segredo para evitar rachaduras e garantir um pudim cremoso e bem equilibrado no sabor.",
  },
  {
    image: cookieImg,
    title: "Cookies Crocantes por Fora e Macios por Dentro",
    description:
      "A receita definitiva para cookies que derretem na boca! Feitos com gotas de chocolate, eles têm um equilíbrio perfeito entre crocância e maciez. Veja os truques para evitar que fiquem duros ou secos.",
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { currentArticle, sideArticles, loading, error } = useHomeArticle();
  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
    hasMore,
    isCreating,
    createError,
    loadMore,
    createComment,
  } = useArticleComments(currentArticle?.id);

  return (
    <>
      {isAuthenticated && (
        <div className="container mt-3">
          <div
            className="alert alert-primary d-flex align-items-center justify-content-between"
            role="alert"
          >
            <div>
              <i className="bi bi-cart-plus fs-4 me-2"></i>
              <strong>Explore nossas receitas exclusivas!</strong>
              <p className="mb-0">
                Descubra receitas incríveis de chefs profissionais e adicione-as
                ao seu carrinho.
              </p>
            </div>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate("/")}
            >
              <i className="bi bi-book"></i> Ver Receitas
            </button>
          </div>
        </div>
      )}

      <Carousel items={carouselItems} />

      <div className="ms-4 me-4 mb-3">
        <div className="row">
          <div className="col-lg-2 mb-3" style={{ position: "relative" }}>
            <RecipeSidebarNav items={navItems} />
          </div>

          <div className="col-lg-7 mb-3">
            <Breadcrumb
              items={[
                { label: "Página Inicial", href: "#" },
                {
                  label: currentArticle?.author
                    ? `${currentArticle.author.firstName} ${currentArticle.author.lastName}`
                    : "Autor Desconhecido",
                  href: "#",
                },
                { label: currentArticle?.title || "Receita", active: true },
              ]}
            />

            {loading ? (
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "400px" }}
              >
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">
                      Carregando receita principal...
                    </span>
                  </div>
                  <p className="mt-2 text-muted">
                    Carregando receita principal...
                  </p>
                </div>
              </div>
            ) : error ? (
              <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle"></i> {error}
              </div>
            ) : currentArticle ? (
              <RecipeSection article={currentArticle!} />
            ) : (
              <div className="alert alert-warning" role="alert">
                <i className="bi bi-exclamation-triangle"></i> Nenhum artigo
                disponível.
              </div>
            )}

            <div className="border px-4 py-3">
              <h1 className="mb-3">Comentários</h1>

              {/* Formulário para adicionar comentário */}
              <CommentForm
                onSubmit={createComment}
                isSubmitting={isCreating}
                submitError={createError}
              />

              {/* Lista de comentários */}
              {commentsLoading ? (
                <div className="text-center py-3">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">
                      Carregando comentários...
                    </span>
                  </div>
                  <p className="mt-2 text-muted">Carregando comentários...</p>
                </div>
              ) : commentsError ? (
                <div className="alert alert-warning" role="alert">
                  <i className="bi bi-exclamation-triangle"></i> {commentsError}
                </div>
              ) : comments.length === 0 ? (
                <div className="text-center text-muted py-4">
                  <i
                    className="bi bi-chat-dots"
                    style={{ fontSize: "2rem", opacity: 0.5 }}
                  ></i>
                  <p className="mt-2 mb-0">
                    Ainda não há comentários neste artigo.
                  </p>
                  <small>Seja o primeiro a compartilhar sua opinião!</small>
                </div>
              ) : (
                <>
                  {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))}

                  {/* Botão para carregar mais comentários */}
                  {hasMore && (
                    <div className="text-center mt-3">
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={loadMore}
                        disabled={commentsLoading}
                      >
                        {commentsLoading ? (
                          <>
                            <div
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Carregando...
                              </span>
                            </div>
                            Carregando...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-arrow-down-circle me-2"></i>
                            Carregar mais comentários
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="col-lg-3 px-3 mb-3">
            <div className="row">
              {loading ? (
                <div className="col-12 text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">
                      Carregando receitas...
                    </span>
                  </div>
                </div>
              ) : error ? (
                <div className="col-12">
                  <div className="alert alert-danger" role="alert">
                    <i className="bi bi-exclamation-triangle"></i> {error}
                  </div>
                </div>
              ) : (
                <>
                  {sideArticles.map((article) => (
                    <div key={article.id} className="col-sm-6 col-lg-12">
                      <ApiRecipeCard article={article} />
                    </div>
                  ))}
                  {sideArticles.length < 2 &&
                    sideRecipes
                      .slice(sideArticles.length)
                      .map((recipe, index) => (
                        <div
                          key={`fallback-${index}`}
                          className="col-sm-6 col-lg-12"
                        >
                          <RecipeCard {...recipe} />
                        </div>
                      ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
