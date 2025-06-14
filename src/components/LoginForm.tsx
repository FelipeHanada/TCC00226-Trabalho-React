export default function LoginForm() {
  return (
    <>
      <h1 className="fw-bold" style={{ color: "#3c3c3c" }}>Entrar</h1>
      <button type="button" className="btn btn-primary rounded-pill fw-bold">
        <i className="bi bi-facebook"></i>&nbsp; Entrar com Facebook
      </button>

      <button type="button" className="btn btn-danger rounded-pill fw-bold">
        <i className="bi bi-google"></i>&nbsp; Entrar com Google
      </button>

      <p className="w-100 login-text-divisor text-center">ou</p>

      <form className="w-100 d-flex flex-column">
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control w-100"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput" style={{ color: "#3c3c3c" }}>E-mail</label>
        </div>
        <div className="form-floating mb-2">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword" style={{ color: "#3c3c3c" }}>Senha</label>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            style={{ cursor: "pointer" }}
            id="flexSwitchCheckDefault"
          />
          <label
            className="form-check-label mb-2"
            style={{ cursor: "pointer" }}
            htmlFor="flexSwitchCheckDefault"
          >
            Mantenha-me contectado
          </label>
        </div>
        <a href="#" className="mb-4 text-decoration-none" style={{ alignSelf: "flex-start" }}>Esqueceu sua senha?</a>

        <button
          type="button"
          className="btn btn-danger rounded-pill fw-bold w-50 align-self-center"
        >
          <i className="bi bi-arrow-right-short"></i>&nbsp; Entrar
        </button>
      </form>
    </>
  )
}
