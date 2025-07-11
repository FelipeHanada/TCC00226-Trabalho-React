import Footer from "../components/Footer";
import LoginPageHeader from "../components/LoginPageHeader";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <LoginPageHeader />
      <div className="login-page-container pt-5" id="login-html" style={{ width: "100%" }}>
        <main
        className="container w-25 d-flex flex-column justify-content-center align-items-center gap-3 rounded-3 bg-white pt-5 pb-5 mb-5"
        >
          <RegisterForm />
        </main>
        <Footer />
      </div>
    </>
  )
}
