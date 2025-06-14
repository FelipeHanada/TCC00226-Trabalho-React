export default function AboutInfoProfileCard() {
  return (
    <>
      <div className="col-lg-6 d-flex flex-column align-items-center overflow-auto" style={{ maxHeight: "80vh" }}>
        <div className="card rounded border mb-3 w-100">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title">
                    <span className="me-2"><i className="fa-solid fa-user"></i></span>
                    Sobre Mim
                </h5>

                <a href="#" className="btn btn-outline-secondary" id="add-recipe-btn">
                    <i className="fa-solid fa-pencil"></i>
                </a>
            </div>
            <div className="card-body">
                <p className="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                    tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>

        <div className="card rounded border mb-3 w-100">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title">
                    <span className="me-2"><i className="fa-solid fa-star"></i></span>
                    Minhas Receitas Favoritas
                </h5>

                <a href="#" className="btn btn-outline-secondary" id="add-recipe-btn">
                    <i className="fa-solid fa-plus"></i>
                </a>
            </div>

            <div className="card-body">
                <p className="card-text">Aqui estão algumas das minhas receitas favoritas:</p>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Receita 1</li>
                    <li className="list-group-item">Receita 2</li>
                    <li className="list-group-item">Receita 3</li>
                    <li className="list-group-item">Receita 4</li>
                </ul>
            </div>
        </div>

        <div className="card rounded border mb-3 w-100">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title">
                    <span className="me-2"><i className="fa-solid fa-book"></i></span>
                    Minhas Receitas Criadas
                </h5>
            </div>
            <div className=" card-body">
                <p className="card-text">Aqui estão algumas das receitas que eu criei:</p>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Receita 1</li>
                    <li className="list-group-item">Receita 2</li>
                    <li className="list-group-item">Receita 3</li>
                </ul>
            </div>
        </div>
      </div>
    </>
  )
}
