interface CategoryCardProps {
  image: string
  title: string
  alt?: string
}

export default function CategoryCard({ image, alt, title }: CategoryCardProps) {
  return (
    <div className="card category-card">
      <img src={image} className="card-img-top" alt={alt} />
      <div className="card-body text-center">
        <h5 className="card-title">{title}</h5>
      </div>
    </div>
  )
}

export type {CategoryCardProps}
