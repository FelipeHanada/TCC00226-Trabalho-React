import { Link } from "react-router-dom";
import fruitLogo from "../assets/images/fruit-tomato-vegetables-svgrepo-com.svg";

export default function ProfilePageNavbar() {
  return (
    <>
      <nav className="navbar sticky-top bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="./pag-busca.html">
                <img src={fruitLogo} alt="Logo" width="30" height="30"
                    className="d-inline-block align-text-top" id="nav-icon" />
                Site de Receitas
            </a>

            <div className="dropdown">
                <a className="btn btn-outline-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i className="fa-solid fa-list-ul"></i>
                </a>

                <ul className="dropdown-menu dropdown-menu-end">
                    <li><Link className="dropdown-item" to="/"><i className="fa-solid fa-house me-2"></i>Página
                            Principal</Link>
                    </li>
                    <li><Link className="dropdown-item" to="/profile"><i className="fa-solid fa-user me-2"></i>Meu
                            Perfil</Link></li>
                    <li><Link className="dropdown-item" to="/login"><i className="fa-solid fa-user me-2"></i>Login</Link>
                    </li>
                    <li><Link className="dropdown-item" to="/"><i className="fa-solid fa-right-from-bracket me-2"></i>Sair</Link>
                    </li>
                </ul>
            </div>
        </div>
      </nav>
    </>
  )
}
