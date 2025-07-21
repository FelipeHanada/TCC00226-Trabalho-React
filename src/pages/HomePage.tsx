import { useNavigate } from 'react-router-dom'
import bananaImg from '../assets/images/banana.jpg'
import cookieImg from '../assets/images/cookie.png'
import pudimImg from '../assets/images/pudim.png'
import slide1Img from '../assets/images/slide1.png'
import slide2Img from '../assets/images/slide2.png'
import { default as slide3Img, default as tortaMorangoImg } from '../assets/images/tortamorango.png'
import Breadcrumb from '../components/Breadcumb'
import type { CarouselItem } from '../components/Carousel'
import Carousel from '../components/Carousel'
import Comment from '../components/Comment'
import type { RecipeCardProps } from '../components/RecipeCard'
import RecipeCard from '../components/RecipeCard'
import RecipeSection from '../components/RecipeSectionProps'
import RecipeSidebarNav from '../components/RecipeSideBarNav'
import useHomeArticle from '../hooks/useHomeArticle'
import { useAuthStore } from '../store/authStore'
import { getDefaultIngredients, getDefaultInstructions, parseArticleContent } from '../utils/articleParser'
import ApiRecipeCard from '../components/ApiRecipeCard'


const carouselItems: CarouselItem[] = [
  {
    src: slide1Img,
    alt: 'Slide 1 - Salada de frutas',
    captionTitle: 'Café da Manhã Feliz?',
    captionText: 'Acorde todas as manhãs com uma boa receita de salada de frutas!',
  },
  {
    src: slide2Img,
    alt: 'Slide 2 - Fettuccine Alfredo',
    captionTitle: 'Jantar à luz de velas?',
    captionText:
      'Que tal surpreender quem é especial para você com uma boa receita de Fettuccine Alfredo?',
  },
  {
    src: slide3Img,
    alt: 'Slide 3 - Sopa de abóbora',
    captionTitle: 'Nada melhor em uma tarde do que uma sopa...',
    captionText:
      'Experimente esta receita de sopa cremosa de abóbora com um toque de gengibre. Perfeita para aquecer as tardes mais frias!',
  },
]

const navItems = [
  { label: 'Descrição', href: '#descricao' },
  { label: 'Ingredientes', href: '#ingredientes' },
  { label: 'Modo de Preparo', href: '#modo-preparo' },
]

const comments = [
  {
    userImage: bananaImg,
    username: 'Camila Dias',
    publishedAt: '10/04/2025 às 23:12',
    content: 'Nunca pensei que fosse tão fácil fazer uma torta de morango. Com certeza farei de novo!',
    replies: [
      {
        userImage: bananaImg,
        username: 'Camila Dias',
        publishedAt: '10/04/2025 às 23:12',
        content: 'Nunca pensei que fosse tão fácil fazer uma torta de morango. Com certeza farei de novo!',
        replies: [],
      },
    ],
  },
  {
    userImage: bananaImg,
    username: 'Camila Dias',
    publishedAt: '10/04/2025 às 23:12',
    content: 'Nunca pensei que fosse tão fácil fazer uma torta de morango. Com certeza farei de novo!',
    replies: [
      {
        userImage: bananaImg,
        username: 'Camila Dias',
        publishedAt: '10/04/2025 às 23:12',
        content: 'Nunca pensei que fosse tão fácil fazer uma torta de morango. Com certeza farei de novo!',
        replies: [
          {
            userImage: bananaImg,
            username: 'Camila Dias',
            publishedAt: '10/04/2025 às 23:12',
            content: 'Nunca pensei que fosse tão fácil fazer uma torta de morango. Com certeza farei de novo!',
            replies: [],
          },
        ],
      },
      {
        userImage: bananaImg,
        username: 'Camila Dias',
        publishedAt: '10/04/2025 às 23:12',
        content: 'Nunca pensei que fosse tão fácil fazer uma torta de morango. Com certeza farei de novo!',
        replies: [],
      },
    ],
  },
  {
    userImage: bananaImg,
    username: 'Camila Dias',
    publishedAt: '10/04/2025 às 23:12',
    content: 'Nunca pensei que fosse tão fácil fazer uma torta de morango. Com certeza farei de novo!',
    replies: [],
  },
]

const sideRecipes: RecipeCardProps[] = [
  {
    image: pudimImg,
    title: 'Pudim de Leite Condensado Perfeito',
    description:
      'O clássico pudim lisinho e sem furinhos, com uma calda dourada e caramelizada no ponto certo. Aprenda o segredo para evitar rachaduras e garantir um pudim cremoso e bem equilibrado no sabor.',
  },
  {
    image: cookieImg,
    title: 'Cookies Crocantes por Fora e Macios por Dentro',
    description:
      'A receita definitiva para cookies que derretem na boca! Feitos com gotas de chocolate, eles têm um equilíbrio perfeito entre crocância e maciez. Veja os truques para evitar que fiquem duros ou secos.',
  },
]

export default function HomePage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const { currentArticle, sideArticles, loading, error } = useHomeArticle()
  
  // Processar conteúdo do artigo principal
  const articleContent = currentArticle?.contentMD 
    ? parseArticleContent(currentArticle.contentMD)
    : { ingredients: [], instructions: [] }
  
  const ingredients = articleContent.ingredients.length > 0 
    ? articleContent.ingredients 
    : getDefaultIngredients()
  
  const instructions = articleContent.instructions.length > 0 
    ? articleContent.instructions 
    : getDefaultInstructions()

  return (
    <>
      {isAuthenticated && (
        <div className="container mt-3">
          <div className="alert alert-primary d-flex align-items-center justify-content-between" role="alert">
            <div>
              <i className="bi bi-cart-plus fs-4 me-2"></i>
              <strong>Explore nossas receitas exclusivas!</strong>
              <p className="mb-0">Descubra receitas incríveis de chefs profissionais e adicione-as ao seu carrinho.</p>
            </div>
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/articles')}
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
                { label: 'Página Inicial', href: '#' },
                { label: 'Doces', href: '#' },
                { label: 'Tortas', href: '#' },
                { label: 'Marco Antónitos', href: '#' },
                { label: currentArticle?.title || 'Receita Completa de Torta de Morango', active: true },
              ]}
            />

            {loading ? (
              <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '400px' }}>
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando receita principal...</span>
                  </div>
                  <p className="mt-2 text-muted">Carregando receita principal...</p>
                </div>
              </div>
            ) : error ? (
              <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle"></i> {error}
              </div>
            ) : (
              <RecipeSection
                author={currentArticle?.author ? `${currentArticle.author.firstName} ${currentArticle.author.lastName}` : "Autor Desconhecido"}
                date={currentArticle ? "Publicado recentemente" : "Publicado em 01/04/2025 às 20:33"}
                imageSrc={currentArticle?.cardImage || tortaMorangoImg}
                imageAlt={currentArticle?.title || "Torta de Morango"}
                description={currentArticle?.description || "A torta de morango é uma sobremesa clássica e deliciosa, perfeita para qualquer ocasião..."}
                ingredients={ingredients}
                instructions={instructions}
              />
            )}

            <div className="border px-4 py-3">
              <h1 className="mb-3">Comentários</h1>
              {comments.map((comment, index) => (
                <Comment key={index} {...comment} />
              ))}
            </div>

          </div>

          <div className="col-lg-3 px-3 mb-3">
            <div className="row">
              {loading ? (
                <div className="col-12 text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando receitas...</span>
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
                  {sideArticles.length < 2 && sideRecipes.slice(sideArticles.length).map((recipe, index) => (
                    <div key={`fallback-${index}`} className="col-sm-6 col-lg-12">
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
  )
}
