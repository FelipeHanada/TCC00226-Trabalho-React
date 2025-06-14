import bananaImg from '../assets/images/banana.jpg'
import slide1Img from '../assets/images/slide1.png'
import slide2Img from '../assets/images/slide2.png'
import slide3Img from '../assets/images/slide3.png'
import tortaMorangoImg from '../assets/images/tortamorango.png'
import Alert from '../components/Alert'
import Breadcrumb from '../components/Breadcumb'
import BreadcrumbInfo from '../components/BreadcumbInfo'
import type { CarouselItem } from '../components/Carousel'
import Carousel from '../components/Carousel'
import Comment from '../components/Comment'
import RecipeSection from '../components/RecipeSectionProps'
import RecipeSidebarNav from '../components/RecipeSideBarNav'
import pudimImg from '../assets/images/pudim.png'
import cookieImg from '../assets/images/cookie.png'
import type { RecipeCardProps } from '../components/RecipeCard'
import RecipeCard from '../components/RecipeCard'
import PlaceholderCard from '../components/PlaceholderCard'


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
  return (
    <>
      <Carousel items={carouselItems} />
      <Alert
        message="Os textos exibidos na receita e nos cards laterais foram gerados com auxílio da ferramenta Chat GPT-4o mini."
        type="info"
        dismissible
      />
      <div className="ms-4 me-4 mb-3">
        <div className="row">
          <div className="col-lg-2 mb-3" style={{ position: "relative" }}>
            <RecipeSidebarNav items={navItems} />        
          </div>

          <div className="col-lg-7 mb-3">
            <BreadcrumbInfo message="Isso é um BreadCrumb." />

            <Breadcrumb
              items={[
                { label: 'Página Inicial', href: '#' },
                { label: 'Doces', href: '#' },
                { label: 'Tortas', href: '#' },
                { label: 'Marco Antónitos', href: '#' },
                { label: 'Receita Completa de Torta de Morango', active: true },
              ]}
            />

            <RecipeSection
              author="Marcos Antónitos"
              date="Publicado em 01/04/2025 às 20:33"
              imageSrc={tortaMorangoImg}
              imageAlt="Torta de Morango"
              description="A torta de morango é uma sobremesa clássica e deliciosa, perfeita para qualquer ocasião..."
              ingredients={[
                {
                  title: 'Para a massa',
                  items: [
                    '2 xícaras de farinha de trigo...',
                    '1/2 xícara de manteiga gelada cortada em cubos',
                    '1/4 de xícara de açúcar',
                    '1 pitada de sal',
                    '1 gema de ovo',
                    '3 colheres de sopa de água gelada (adicionar aos poucos...)'
                  ]
                },
                {
                  title: 'Para o recheio',
                  items: [
                    '1 lata de leite condensado',
                    '1 lata de creme de leite sem soro',
                    '2 colheres de sopa de amido de milho',
                    '500 ml de leite',
                    '2 gemas de ovo peneiradas',
                    '1 colher de chá de essência de baunilha'
                  ]
                },
                {
                  title: 'Para a cobertura',
                  items: [
                    '2 caixas de morangos frescos',
                    '1 xícara de açúcar',
                    '1/2 xícara de água',
                    '1 colher de sopa de suco de limão',
                    '1 colher de sopa de amido de milho dissolvido em 2 colheres de sopa de água'
                  ]
                }
              ]}
              instructions={[
                'Para preparar a torta, comece pela massa...',
                'Para preparar o recheio, misture em uma panela...',
                'Agora é hora de montar a torta...',
                'Leve à geladeira por pelo menos duas horas...'
              ]}
            />

            <div className="border px-4 py-3">
              <h1 className="mb-3">Comentários</h1>
              {comments.map((comment, index) => (
                <Comment key={index} {...comment} />
              ))}
            </div>

          </div>

          <div className="col-lg-3 px-3 mb-3">
            <div className="row">
              {sideRecipes.map((recipe, index) => (
                <div key={index} className="col-sm-6 col-lg-12">
                  <RecipeCard {...recipe} />
                </div>
              ))}
              <div className="col-sm-6 col-lg-12">
                <Alert message="Isso é um Placeholder." type="info" />

                <PlaceholderCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
