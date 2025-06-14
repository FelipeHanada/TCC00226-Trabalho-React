interface RecipeSectionProps {
  author: string
  date: string
  imageSrc: string
  imageAlt?: string
  description: string
  ingredients: {
    title: string
    items: string[]
  }[]
  instructions: string[]
}

export default function RecipeSection({
  author,
  date,
  imageSrc,
  imageAlt = '',
  description,
  ingredients,
  instructions,
}: RecipeSectionProps) {
  return (
    <div
      className="border px-4 py-3 mb-5"
      data-bs-spy="scroll"
      data-bs-target="#article-nav"
      data-bs-root-margin="-1000px 0px -40%"
      data-bs-smooth-scroll="true"
      tabIndex={0}
    >
      <h1>Receita Completa de Torta de Morango</h1>

      <div className="d-flex justify-content-between">
        <p>{author}</p>
        <p>{date}</p>
      </div>

      <div className="d-flex justify-content-center mb-3">
        <img
          src={imageSrc}
          className="img-fluid rounded border"
          style={{ height: 240, width: 360, overflow: 'hidden' }}
          alt={imageAlt}
        />
      </div>

      <section id="descricao">
        <p className="text-justify">{description}</p>
      </section>

      <section id="ingredientes">
        <h3>Ingredientes</h3>
        {ingredients.map((group, i) => (
          <div key={i}>
            <h4>{group.title}</h4>
            <ul>
              {group.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section id="modo-preparo">
        <h3>Modo de Preparo</h3>
        {instructions.map((step, i) => (
          <p key={i} className="text-justify">
            {step}
          </p>
        ))}
      </section>
    </div>
  )
} 
