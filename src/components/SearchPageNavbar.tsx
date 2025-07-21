import { Link } from "react-router-dom";
import fruitLogo from "../assets/images/fruit-tomato-vegetables-svgrepo-com.svg";

export default function SearchPageNavbar() {
  return (
    <>
    <header className="w-100 d-flex flex-column justify-content-center align-items-center bg-white pb-3">
      <div className="search-bar-container w-100 p-3 d-flex justify-content-center align-items-center bg-white mb-2"
        style={{ borderBottom: "1px solid rgba(153, 153, 153, 0.7)" }}>
        <img src={fruitLogo}
          style={{ height: "clamp(50px, 8dvh, 100px)", transform: "translateY(-5%)" }} alt="Logo" draggable="false"
          className="d-inline-block me-3 align-text-top" />
        <h1>Site de Receitas</h1>

        <form className="d-flex ms-5 w-50">
          <input className="form-control" style={{
                borderRadius: 0,
                borderTopLeftRadius: "1rem",
                borderBottomLeftRadius: "1rem"
              }} type="search" placeholder="Procure uma receita, um prato ou um ingrediente" aria-label="Search" />
          <button className="btn btn-outline-success" style={{
                borderRadius: 0,
                borderTopRightRadius: "1rem",
                borderBottomRightRadius: "1rem"
              }} type="submit">
            Procurar
          </button>
        </form>

        <Link to="../profile" className="ms-3 text-decoration-none">
          <div className="profile-button" style={{ borderRadius: "50%" }}>
            <i className="bi bi-person-fill"></i>
          </div>
        </Link>
      </div>

      <nav className="mt-3 mb-2">
        <ul className="w-100 list-unstyled mb-0 d-flex justify-content-center flex-wrap gap-4 footer-ul">
          <li className="dropdown">
            <a className="text-decoration-none dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              BOLOS E TORTAS
            </a>
            <ul className="dropdown-menu p-3" style={{ minWidth: "340px", whiteSpace: "normal" }}>
              <div className="row">
                <div className="col-6">
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Bolo de Cenoura</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Torta de Limão</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Cheesecake</a>
                  </li>
                </div>
                <div className="col-6">
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Bolo de Chocolate</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Torta Holandesa</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Bolo de Fubá</a>
                  </li>
                </div>
              </div>
            </ul>
          </li>

          <li className="dropdown">
            <a className="text-decoration-none dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              CARNES
            </a>
            <ul className="dropdown-menu p-3" style={{ minWidth: "340px", whiteSpace: "normal" }}>
              <div className="row">
                <div className="col-6">
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Picanha na Brasa</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Carne de Panela</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Costela Assada</a>
                  </li>
                </div>
                <div className="col-6">
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Filé ao Molho Madeira</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Lagarto Recheado</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Bife à Parmegiana</a>
                  </li>
                </div>
              </div>
            </ul>
          </li>

          <li className="dropdown">
            <a className="text-decoration-none dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              AVES
            </a>
            <ul className="dropdown-menu p-3" style={{ minWidth: "340px", whiteSpace: "normal" }}>
              <div className="row">
                <div className="col-6">
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Frango Assado</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Galinhada</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Peito de Frango Grelhado</a>
                  </li>
                </div>
                <div className="col-6">
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Sobrecoxa ao Curry</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Peru Recheado</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Frango à Passarinho</a>
                  </li>
                </div>
              </div>
            </ul>
          </li>

          <li className="dropdown">
            <a className="text-decoration-none dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              PEIXES E FRUTOS DO MAR
            </a>
            <ul className="dropdown-menu p-3" style={{ minWidth: "340px", whiteSpace: "normal" }}>
              <div className="row">
                <div className="col-6">
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Salmão Grelhado</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Bacalhau ao Forno</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Atum com Ervas</a>
                  </li>
                </div>
                <div className="col-6">
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Camarão na Moranga</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Lula Empanada</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Moqueca Baiana</a>
                  </li>
                </div>
              </div>
            </ul>
          </li>

          <li className="dropdown">
            <a className="text-decoration-none dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              SALADAS E MOLHOS
            </a>
            <ul className="dropdown-menu p-3" style={{ minWidth: "340px", whiteSpace: "normal" }}>
              <div className="row">
                <div className="col-6">
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Salada Caesar</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Molho Tártaro</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Salada Grega</a>
                  </li>
                </div>
                <div className="col-6">
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Vinagrete</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Molho de Iogurte</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Salada Tropical</a>
                  </li>
                </div>
              </div>
            </ul>
          </li>

          <li className="dropdown">
            <a className="text-decoration-none dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              SOPAS
            </a>
            <ul className="dropdown-menu p-3" style={{ minWidth: "340px", whiteSpace: "normal" }}>
              <div className="row">
                <div className="col-6">
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Sopa de Legumes</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Caldo Verde</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Canja de Galinha</a>
                  </li>
                </div>
                <div className="col-6">
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Sopa de Ervilha</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Sopa de Abóbora</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Sopa de Cebola</a>
                  </li>
                </div>
              </div>
            </ul>
          </li>

          <li className="dropdown">
            <a className="text-decoration-none dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              MASSAS
            </a>
            <ul className="dropdown-menu p-3" style={{ minWidth: "340px", whiteSpace: "normal" }}>
              <div className="row">
                <div className="col-6">
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Macarrão à Bolonhesa</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Rondelli de Presunto</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Lasanha Quatro Queijos</a>
                  </li>
                </div>
                <div className="col-6">
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Nhoque ao Sugo</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Talharim ao Pesto</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Canelone de Espinafre</a>
                  </li>
                </div>
              </div>
            </ul>
          </li>

          <li className="dropdown">
            <a className="text-decoration-none dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              DOCES E SOBREMESAS
            </a>
            <ul className="dropdown-menu p-3" style={{ minWidth: "340px", whiteSpace: "normal" }}>
              <div className="row">
                <div className="col-6">
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Pudim de Leite</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Brigadeiro Gourmet</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Tiramisu</a>
                  </li>
                </div>
                <div className="col-6">
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Pavê de Morango</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Mousse de Maracujá</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Quindim</a>
                  </li>
                </div>
              </div>
            </ul>
          </li>

          <li className="dropdown">
            <a className="text-decoration-none dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              LANCHES
            </a>
            <ul className="dropdown-menu p-3" style={{ minWidth: "340px", whiteSpace: "normal" }}>
              <div className="row">
                <div className="col-6">
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Sanduíche Natural</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Hambúrguer Artesanal</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Tapioca Recheada</a>
                  </li>
                </div>
                <div className="col-6">
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Cachorro-Quente</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Pão de Queijo</a>
                  </li>
                  <li>
                    <a className="dropdown-item text-wrap" href="#">Torrada com Patê</a>
                  </li>
                </div>
              </div>
            </ul>
          </li>

          <li>
            <a href="#" className="text-decoration-none">TODAS AS RECEITAS</a>
          </li>
        </ul>
      </nav>
    </header>
    </>
  )  
}
