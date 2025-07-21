import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useEfetuarLogin from "../hooks/useEfetuarLogin";
import { useAuthStore } from "../store/authStore";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .min(1, "Senha é obrigatória"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const navigate = useNavigate();
  const efetuarLogin = useEfetuarLogin();
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (efetuarLogin.isSuccess) {
      reset();
      navigate("/catalog");
    }
  }, [efetuarLogin.isSuccess, reset, navigate]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const loginResponse = await efetuarLogin.mutateAsync({
        email: data.email,
        senha: data.password,
      });

      const userData = {
        id: loginResponse.user.id,
        email: loginResponse.user.email,
        firstName: loginResponse.user.firstName,
        lastName: loginResponse.user.lastName,
        aboutMe: loginResponse.user.aboutMe,
        phoneNumber: loginResponse.user.phoneNumber,
      };

      login(userData, loginResponse.token);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <>
      <h1 className="fw-bold" style={{ color: "#3c3c3c" }}>
        Entrar
      </h1>

      <form
        className="w-100 d-flex flex-column"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-floating mb-3">
          <input
            type="email"
            className={`form-control w-100 ${errors.email ? "is-invalid" : ""}`}
            id="floatingInput"
            placeholder="name@example.com"
            {...register("email")}
          />
          <label htmlFor="floatingInput" style={{ color: "#3c3c3c" }}>
            E-mail
          </label>
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>
        <div className="form-floating mb-2">
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            id="floatingPassword"
            placeholder="Password"
            {...register("password")}
          />
          <label htmlFor="floatingPassword" style={{ color: "#3c3c3c" }}>
            Senha
          </label>
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            style={{ cursor: "pointer" }}
            id="flexSwitchCheckDefault"
            {...register("rememberMe")}
          />
          <label
            className="form-check-label mb-2"
            style={{ cursor: "pointer" }}
            htmlFor="flexSwitchCheckDefault"
          >
            Mantenha-me conectado
          </label>
        </div>
        <a
          href="#"
          className="mb-4 text-decoration-none"
          style={{ alignSelf: "flex-start" }}
        >
          Esqueceu sua senha?
        </a>

        {efetuarLogin.isError && (
          <div className="alert alert-danger mb-3" role="alert">
            {efetuarLogin.error?.message ||
              "Erro ao fazer login. Verifique suas credenciais e tente novamente."}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || efetuarLogin.isPending}
          className="btn btn-danger rounded-pill fw-bold w-50 align-self-center"
        >
          {isSubmitting || efetuarLogin.isPending ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Entrando...
            </>
          ) : (
            <>
              <i className="bi bi-arrow-right-short"></i>&nbsp; Entrar
            </>
          )}
        </button>

        <a
          href="/register"
          className="btn btn-success rounded-pill fw-bold w-50 align-self-center mt-3 text-decoration-none"
        >
          <i className="bi bi-person-plus"></i>&nbsp;Cadastre-se
        </a>
      </form>
    </>
  );
}
