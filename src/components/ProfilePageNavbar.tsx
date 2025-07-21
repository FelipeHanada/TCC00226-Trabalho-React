import { Link, useNavigate } from "react-router-dom";
import fruitLogo from "../assets/images/fruit-tomato-vegetables-svgrepo-com.svg";
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { useFavoritesStore } from '../store/favoritesStore';

export default function ProfilePageNavbar() {
  const { getItemCount } = useCartStore();
  const { favorites } = useFavoritesStore();
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  
  const itemCount = getItemCount();
  const favoritesCount = favorites.length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar sticky-top bg-body-tertiary">
        <div className="container-fluid">
            <Link className="navbar-brand" to="./search">
                <img src={fruitLogo} alt="Logo" width="30" height="30"
                    className="d-inline-block align-text-top" id="nav-icon" />
                Site de Receitas
            </Link>

            <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-outline-primary position-relative"
                  onClick={() => navigate('/cart')}
                  title="Carrinho de compras"
                >
                  <i className="bi bi-cart3"></i>
                  {itemCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {itemCount}
                      <span className="visually-hidden">itens no carrinho</span>
                    </span>
                  )}
                </button>

                {isAuthenticated && (
                  <button
                    className="btn btn-outline-danger position-relative"
                    onClick={() => navigate('/favorites')}
                    title="Meus favoritos"
                  >
                    <i className="bi bi-heart"></i>
                    {favoritesCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {favoritesCount}
                        <span className="visually-hidden">receitas favoritas</span>
                      </span>
                    )}
                  </button>
                )}

                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/home')}
                  title="Ver receitas"
                >
                  <i className="bi bi-book"></i> Catálogo
                </button>

                {isAuthenticated && (
                  <button
                    className="btn btn-outline-success"
                    onClick={() => navigate('/create-article')}
                    title="Criar novo artigo"
                  >
                    <i className="bi bi-plus-circle"></i> Criar Artigo
                  </button>
                )}

                <div className="dropdown">
                    <a className="btn btn-outline-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i className="fa-solid fa-list-ul"></i>
                    </a>

                <ul className="dropdown-menu dropdown-menu-end">
                    <li><Link className="dropdown-item" to="/search"><i className="fa-solid fa-house me-2"></i>Página
                            Principal</Link>
                    </li>
                    <li><Link className="dropdown-item" to="/profile"><i className="fa-solid fa-user me-2"></i>Meu
                            Perfil</Link></li>
                    {isAuthenticated && (
                      <li><Link className="dropdown-item" to="/favorites"><i className="bi bi-heart me-2"></i>Meus
                              Favoritos</Link></li>
                    )}
                    {isAuthenticated && (
                      <li><Link className="dropdown-item" to="/create-article"><i className="bi bi-plus-circle me-2"></i>Criar
                              Artigo</Link></li>
                    )}
                    <li><Link className="dropdown-item" to="/login"><i className="fa-solid fa-user me-2"></i>Login</Link>
                    </li>
                    <li>
                      <a 
                        className="dropdown-item" 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          handleLogout();
                        }}
                      >
                        <i className="fa-solid fa-right-from-bracket me-2"></i>Sair
                      </a>
                    </li>
                </ul>
                </div>
            </div>
        </div>
      </nav>
    </>
  )
}
