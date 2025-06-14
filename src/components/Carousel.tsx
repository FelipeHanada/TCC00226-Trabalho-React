interface CarouselItem {
  src: string
  alt?: string
  captionTitle?: string
  captionText?: string
}

interface CarouselProps {
  id?: string
  items: CarouselItem[]
}

export default function Carousel({ id = 'mainCarousel', items }: CarouselProps) {
  return (
    <>
    <div id={id} className="carousel slide carousel-fade mb-3" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {items.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target={`#${id}`}
            data-bs-slide-to={index}
            className={index === 0 ? 'active' : ''}
            aria-current={index === 0 ? 'true' : undefined}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="carousel-inner">
        {items.map((item, index) => (
          <div
            key={index}
            className={`carousel-item${index === 0 ? ' active' : ''}`}
          >
            <img src={item.src} className="d-block w-100" alt={item.alt} />
            {(item.captionTitle || item.captionText) && (
              <div className="carousel-caption d-none d-md-block">
                {item.captionTitle && <h5>{item.captionTitle}</h5>}
                {item.captionText && <p>{item.captionText}</p>}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#${id}`}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={`#${id}`}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Próximo</span>
      </button>
    </div>
    </>
  )
}

export type {CarouselItem}
