export interface Article {
  id: string;
  title: string;
  author: string;
  image: string;
  price: number;
  description: string;
  category: string;
}

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "Bolo de Chocolate Especial",
    author: "Chef Maria Silva",
    image: "/src/assets/images/bolo-chocolate.png",
    price: 15.99,
    description: "Receita exclusiva de bolo de chocolate com cobertura cremosa",
    category: "Sobremesas"
  },
  {
    id: "2", 
    title: "Frango Grelhado com Ervas",
    author: "Chef João Santos",
    image: "/src/assets/images/frango-grelhado.png",
    price: 12.50,
    description: "Receita profissional de frango grelhado com mix de ervas",
    category: "Carnes"
  },
  {
    id: "3",
    title: "Lasanha Bolonhesa Tradicional",
    author: "Chef Ana Costa",
    image: "/src/assets/images/lasanha-bolonhesa.png",
    price: 18.75,
    description: "Autêntica receita italiana de lasanha bolonhesa",
    category: "Massas"
  },
  {
    id: "4",
    title: "Pavê de Chocolate Premium",
    author: "Chef Carlos Mendes",
    image: "/src/assets/images/pave.png",
    price: 14.25,
    description: "Receita sofisticada de pavê com chocolate belga",
    category: "Sobremesas"
  },
  {
    id: "5",
    title: "Pudim de Leite Condensado",
    author: "Chef Fernanda Lima",
    image: "/src/assets/images/pudim.png",
    price: 9.99,
    description: "Clássico pudim brasileiro com calda de açúcar",
    category: "Sobremesas"
  },
  {
    id: "6",
    title: "Torta de Limão Gourmet",
    author: "Chef Roberto Alves",
    image: "/src/assets/images/torta-limao.png",
    price: 16.50,
    description: "Torta de limão com massa crocante e merengue",
    category: "Sobremesas"
  },
  {
    id: "7",
    title: "Cookies Americanos",
    author: "Chef Patricia Rocha",
    image: "/src/assets/images/cookie.png",
    price: 8.75,
    description: "Receita original de cookies com gotas de chocolate",
    category: "Sobremesas"
  },
  {
    id: "8",
    title: "Torta de Morango Fresh",
    author: "Chef Luciana Freitas",
    image: "/src/assets/images/tortamorango.png",
    price: 19.90,
    description: "Deliciosa torta de morango com chantilly",
    category: "Sobremesas"
  }
];

export const getArticleById = (id: string): Article | undefined => {
  return mockArticles.find(article => article.id === id);
};

export const getArticlesByCategory = (category: string): Article[] => {
  return mockArticles.filter(article => article.category === category);
};
