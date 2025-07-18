import Carousel, { type CarouselItem } from "../components/Carousel";
import SearchPageNavbar from "../components/SearchPageNavbar";
import pudimChocolate from '../assets/images/pudim-chocolate.png'
import pave from '../assets/images/pave.png'
import tortaLimao from '../assets/images/torta-limao.png'
import saladasImg from '../assets/images/saladas.png'
import sobremesasImg from '../assets/images/sobremesas.png'
import carnesImg from '../assets/images/carnes.png'
import massasImg from '../assets/images/massas.png'
import CategoryCard, { type CategoryCardProps } from "../components/CategoryCard";
import boloChocolateImg from '../assets/images/bolo-chocolate.png'
import lasanhaBolonhesaImg from '../assets/images/lasanha-bolonhesa.png'
import frangoGrelhadoImg from '../assets/images/frango-grelhado.png'
import type { RecipeCardProps } from "../components/RecipeCard";
import RecipeCard from "../components/RecipeCard";
import Footer from "../components/Footer";

const carouselItems: CarouselItem[] = [
  {
    src: pudimChocolate,
    alt: 'Receita 1',
    captionTitle: 'Receita Especial da Semana',
    captionText: 'Experimente nossos pratos incríveis!',
  },
  {
    src: pave,
    alt: 'Receita 2',
  },
  {
    src: tortaLimao,
    alt: 'Receita 3',
  },
]

const categories: CategoryCardProps[] = [
  { image: saladasImg, alt: 'Saladas', title: 'Saladas' },
  { image: sobremesasImg, alt: 'Sobremesas', title: 'Sobremesas' },
  { image: carnesImg, alt: 'Carnes', title: 'Carnes' },
  { image: massasImg, alt: 'Massas', title: 'Massas' },
]

const popularRecipes: RecipeCardProps[] = [
  {
    image: boloChocolateImg,
    alt: 'Bolo de Chocolate',
    title: 'Bolo de Chocolate',
    description: 'Delicioso bolo fofinho coberto com ganache de chocolate.',
    link: './index.html',
    buttonText: 'Ver Receita',
  },
  {
    image: lasanhaBolonhesaImg,
    alt: 'Lasanha à Bolonhesa',
    title: 'Lasanha à Bolonhesa',
    description: 'Camadas de massa, molho e muito queijo para seu almoço.',
    link: './index.html',
    buttonText: 'Ver Receita',
  },
  {
    image: frangoGrelhadoImg,
    alt: 'Frango Grelhado',
    title: 'Frango Grelhado',
    description: 'Peito de frango suculento com tempero especial da casa.',
    link: './index.html',
    buttonText: 'Ver Receita',
  },
]

export default function SearchPage() {
  return (
    <>
      <SearchPageNavbar />
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
          {popularRecipes.map((recipe, index) => (
          <div className="col-md-4" key={index}>
            <RecipeCard {...recipe} />
          </div>
          ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
