import { useNavigate } from 'react-router-dom'
import bananaImg from '../assets/images/banana.jpg'
import cookieImg from '../assets/images/cookie.png'
import pudimImg from '../assets/images/pudim.png'
import slide1Img from '../assets/images/slide1.png'
import slide2Img from '../assets/images/slide2.png'
import { default as slide3Img, default as tortaMorangoImg } from '../assets/images/tortamorango.png'
import ApiRecipeCard from '../components/ApiRecipeCard'
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
  { label: 'Receita Completa', href: '#conteudo' },
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

  const defaultArticle = {
    id: 0,
    title: "Receita Completa de Torta de Morango",
    description: "A torta de morango é uma sobremesa clássica e deliciosa, perfeita para qualquer ocasião especial. Com uma massa crocante, creme suave e morangos frescos, esta receita é um verdadeiro deleite para os amantes de doces.",
    cardImage: tortaMorangoImg,
    contentMD: `# Ingredientes

## Para a massa:
- 200g de farinha de trigo
- 100g de açúcar
- 100g de manteiga gelada
- 1 ovo
- 1 pitada de sal

## Para o creme:
- 500ml de leite
- 3 ovos
- 100g de açúcar
- 3 colheres de sopa de amido de milho
- 1 colher de chá de essência de baunilha

## Para a cobertura:
- 500g de morangos frescos
- 2 colheres de sopa de geleia de morango
- Folhas de hortelã para decorar

# Modo de Preparo

## Preparando a massa:
1. Em uma tigela, misture a farinha, açúcar e sal
2. Adicione a manteiga gelada em cubos e misture até formar uma farofa
3. Adicione o ovo e misture até formar uma massa homogênea
4. Embrulhe em filme plástico e leve à geladeira por 30 minutos

## Preparando o creme:
1. Em uma panela, aqueça o leite em fogo médio
2. Em uma tigela, bata os ovos com açúcar até clarear
3. Adicione o amido de milho e misture bem
4. Adicione o leite quente aos poucos, mexendo sempre
5. Retorne à panela e cozinhe mexendo até engrossar
6. Adicione a essência de baunilha e deixe esfriar

## Montagem:
1. Abra a massa e forre uma forma de torta
2. Faça furos com um garfo e asse por 15 minutos a 180°C
3. Deixe esfriar e adicione o creme
4. Decore com os morangos cortados
5. Pincele com a geleia de morango aquecida
6. Decore com folhas de hortelã

**Dica:** Sirva gelada para melhor sabor!`,
    publishedAt: "2025-01-04T20:33:00",
    author: {
      id: 0,
      firstName: "Marco",
      lastName: "Antônio",
      email: "marco.antonio@email.com",
      phoneNumber: "(21) 99999-9999",
      aboutMe: "Chef especialista em doces e sobremesas"
    }
  }

  const displayArticle = currentArticle || defaultArticle

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
                { label: displayArticle?.author 
                    ? `${displayArticle.author.firstName} ${displayArticle.author.lastName}` 
                    : 'Autor Desconhecido', 
                  href: '#' 
                },
                { label: displayArticle?.title || 'Receita', active: true },
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
            ) : displayArticle ? (
              <RecipeSection article={displayArticle} />
            ) : (
              <div className="alert alert-warning" role="alert">
                <i className="bi bi-exclamation-triangle"></i> Nenhum artigo disponível.
              </div>
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
