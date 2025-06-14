import { Link } from "react-router-dom";
import fruitLogo from "../assets/images/fruit-tomato-vegetables-svgrepo-com.svg";
import uffLogo from "../assets/images/UFF_brasão.png";

export default function Footer() {
  return (
    <footer className="footer w-100 footer-container" style={{ overflow: "hidden" }}>
      <div className="w-100 d-flex justify-content-center align-items-center flex-column"
          style={{ minHeight: "200px", maxHeight: "300px" }}>
          <div className="w-100 h-75 d-flex align-items-center gap-5 mb-2" style={{ justifyContent: "space-evenly" }}>
              <div className="footer-info-container d-flex flex-column justify-content-center align-items-center mt-5">
                  <Link to="/">
                      <img draggable="false" src={fruitLogo} alt="Logo"
                          className="align-text-top fruit-footer-icon" style={{ width: "100px" }} />
                  </Link>
                  <h2 className="text-center">Site de Receitas</h2>
              </div>

              <span className="w-100 text-divisor text-center" style={{ height: "200px" }}></span>

              <div className="d-flex flex-column justify-content-center align-items-center">
                  <p className="mb-0" style={{ width: "max-content" }}>um site criado pelos estudantes da</p>
                  <a href="https://www.ic.uff.br/pos-graduacao/" className="uff-logo-anchor" style={{ textAlign: "center" }}>
                      <img draggable="false" className="uff-logo" src={uffLogo} />
                  </a>
              </div>

              <div className="mt-4">
                  <div className="row">
                      <div className="contacts-container d-flex justify-content-center">
                          <ul className="list-unstyled contacts-grid">
                              <li><Link to=""><i className="bi bi-whatsapp"></i></Link></li>
                              <li><Link to=""><i className="bi bi-youtube"></i></Link></li>
                              <li><Link to=""><i className="bi bi-instagram"></i></Link></li>
                              <li><Link to=""><i className="bi bi-facebook"></i></Link></li>
                              <li><Link to=""><i className="bi bi-tiktok"></i></Link></li>
                              <li><Link to=""><i className="bi bi-pinterest"></i></Link></li>
                              <li><Link to=""><i className="bi bi-twitter-x"></i></Link></li>
                              <li><Link to=""><i className="bi bi-snapchat"></i></Link></li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>

          <ul className="w-100 list-unstyled mb-0 d-flex justify-content-center gap-3 mb-3 footer-ul">
              <li><Link className="text-decoration-none" to="">QUEM SOMOS</Link></li>
              <li><Link className="text-decoration-none" to="">POLÍTICA DE PRIVACIDADE</Link></li>
              <li><Link className="text-decoration-none" to="">TERMOS DE USO</Link></li>
              <li><Link className="text-decoration-none" to="">ANUNCIE</Link></li>
              <li><Link className="text-decoration-none" to="">CONTATO</Link></li>
          </ul>
      </div>
    </footer>
  );
}
