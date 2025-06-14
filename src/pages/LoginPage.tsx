import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import LoginPageHeader from "../components/LoginPageHeader";

export default function LoginPage() {
  return (
    <>
      <LoginPageHeader />
      <div className="login-page-container pt-5" id="login-html" style={{ width: "100%" }}>
        <main
        className="container w-25 d-flex flex-column justify-content-center align-items-center gap-3 rounded-3 bg-white pt-5 pb-5 mb-5"
        >
          <LoginForm />
        </main>
        <Footer />
      </div>
    </>
  )
}
