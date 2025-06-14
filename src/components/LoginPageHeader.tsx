import fruitLogo from "../assets/images/fruit-tomato-vegetables-svgrepo-com.svg";

export default function LoginPageHeader() {
  return (
    <>
      <header className="w-100 p-3 d-flex justify-content-center align-items-center bg-white">
        <img
          src={fruitLogo}
          style={{
            height: "clamp(50px, 8dvh, 100px)",
            transform: "translateY(-5%)",
          }}
          alt="Logo"
          draggable="false"
          className="d-inline-block me-3 align-text-top"
        />
        <h1>Site de Receitas</h1>
      </header>
    </>
  );
}
