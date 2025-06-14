export interface RecipeCardProps {
  image: string
  title: string
  description: string
  alt?: string
  link?: string
  buttonText?: string
}

export default function RecipeCard({
  image,
  title,
  description,
  alt = '',
  link,
  buttonText,
}: RecipeCardProps) {
  return (
    <div className="card m-2 recipe-card">
      <img src={image} className="card-img-top" alt={alt || title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text text-justify">{description}</p>
        {link && buttonText && (
          <a href={link} className="btn btn-primary mt-2">
            {buttonText}
          </a>
        )}
      </div>
    </div>
  )
}
