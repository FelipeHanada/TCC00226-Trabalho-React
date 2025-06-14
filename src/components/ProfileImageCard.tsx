export default function ProfileImageCard() {
  return (
    <>
      <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center">
        <div className="mb-3 position-relative border d-flex justify-content-center align-items-center"
            style={{ borderRadius: "50%", width: "240px", height: "240px" }}>
            <div className="position-absolute spinner-border text-danger w-100 h-100" role="status">
            </div>

            <span>Carregando Imagem...</span>
            {/* <img src="assets/images/banana.jpg" style={{ width: "100%", height: "100%" }} /> */}
        </div>

        <div className="mb-2 alert alert-info alert-dismissible" role="alert">
            <div>Isso é um Spinner.</div>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

        <h2>Nome do Usuário</h2>
        <h5 className="text-secondary">Nome Sobrenome</h5>

        <h5 className="text-secondary">Email:&nbsp;
            <a href="#" className="text-decoration-none text-secondary">
                <i className="fa-solid fa-envelope"></i>&nbsp;
                email@dominio.com
            </a>
        </h5>

        <h5 className="text-secondary">Telefone:&nbsp;
            <a href="#" className="text-decoration-none text-secondary">
                <i className="fa-solid fa-phone"></i>&nbsp;
                (00) 00000-0000
            </a>
        </h5>

        <h5 className="text-secondary">Endereço:&nbsp;
            <a href="#" className="text-decoration-none text-secondary">
                <i className="fa-solid fa-location-dot"></i>&nbsp;
                Rua Exemplo, 123, Bairro, Cidade - Estado
            </a>
        </h5>
      </div>
    </>
  )
}
