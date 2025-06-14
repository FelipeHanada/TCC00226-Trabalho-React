export default function PlaceholderCard() {
  return (
    <div className="card m-2">
      <img className="card-img-top bg-secondary"  />
      <div className="card-body">
        <h5 className="card-title placeholder-glow">
          <span className="placeholder col-6"></span>
          <span className="placeholder col-4"></span>
        </h5>
        <p className="card-text placeholder-glow text-justify">
          <span className="placeholder col-7"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-7"></span>
          <span className="placeholder col-8"></span>
          <span className="placeholder col-3"></span>
          <span className="placeholder col-6"></span>
          <span className="placeholder col-5"></span>
          <span className="placeholder col-9"></span>
        </p>
      </div>
    </div>
  );
} 
