import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import type { UsuarioCadastro } from '../hooks/useCadastrarUsuario';
import useCadastrarUsuario from '../hooks/useCadastrarUsuario';
import ConfirmationModal from './ConfirmationModal';

const registerSchema = z.object({
  firstName: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres'),
  lastName: z.string()
    .min(2, 'Sobrenome deve ter pelo menos 2 caracteres')
    .max(50, 'Sobrenome deve ter no máximo 50 caracteres'),
  phoneNumber: z.string()
    .min(10, 'Telefone deve ter pelo menos 10 dígitos')
    .regex(/^[\d\s\-()]+$/, 'Formato de telefone inválido'),
  email: z.string()
    .email('E-mail inválido')
    .min(1, 'E-mail é obrigatório'),
  password: z.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(100, 'Senha deve ter no máximo 100 caracteres'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean()
    .refine(val => val === true, {
      message: "Você deve aceitar os termos e condições"
    })
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword']
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const navigate = useNavigate();
  const cadastrarUsuario = useCadastrarUsuario();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  useEffect(() => {
    if (cadastrarUsuario.isSuccess) {
      setShowSuccessModal(true);
      reset();
    }
  }, [cadastrarUsuario.isSuccess, reset]);

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/login');
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const usuarioData: UsuarioCadastro = {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: data.password,
        aboutMe: ''
      };

      await cadastrarUsuario.mutateAsync(usuarioData);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  return (
    <>
      <h1 className="fw-bold" style={{ color: "#3c3c3c" }}>Cadastrar</h1>

      <form 
        className="w-100 d-flex flex-column" 
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-floating mb-3">
          <input
            type="text"
            className={`form-control w-100 ${errors.firstName ? 'is-invalid' : ''}`}
            id="floatingFirstName"
            placeholder="Nome"
            {...register('firstName')}
          />
          <label htmlFor="floatingFirstName" style={{ color: "#3c3c3c" }}>Nome</label>
          {errors.firstName && (
            <div className="invalid-feedback">
              {errors.firstName.message}
            </div>
          )}
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className={`form-control w-100 ${errors.lastName ? 'is-invalid' : ''}`}
            id="floatingLastName"
            placeholder="Sobrenome"
            {...register('lastName')}
          />
          <label htmlFor="floatingLastName" style={{ color: "#3c3c3c" }}>Sobrenome</label>
          {errors.lastName && (
            <div className="invalid-feedback">
              {errors.lastName.message}
            </div>
          )}
        </div>

        <div className="form-floating mb-3">
          <input
            type="tel"
            className={`form-control w-100 ${errors.phoneNumber ? 'is-invalid' : ''}`}
            id="floatingPhone"
            placeholder="Telefone"
            {...register('phoneNumber')}
          />
          <label htmlFor="floatingPhone" style={{ color: "#3c3c3c" }}>Telefone</label>
          {errors.phoneNumber && (
            <div className="invalid-feedback">
              {errors.phoneNumber.message}
            </div>
          )}
        </div>

        <div className="form-floating mb-3">
          <input
            type="email"
            className={`form-control w-100 ${errors.email ? 'is-invalid' : ''}`}
            id="floatingEmail"
            placeholder="name@example.com"
            {...register('email')}
          />
          <label htmlFor="floatingEmail" style={{ color: "#3c3c3c" }}>E-mail</label>
          {errors.email && (
            <div className="invalid-feedback">
              {errors.email.message}
            </div>
          )}
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="floatingPassword"
            placeholder="Password"
            {...register('password')}
          />
          <label htmlFor="floatingPassword" style={{ color: "#3c3c3c" }}>Senha</label>
          {errors.password && (
            <div className="invalid-feedback">
              {errors.password.message}
            </div>
          )}
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            id="floatingConfirmPassword"
            placeholder="Confirm Password"
            {...register('confirmPassword')}
          />
          <label htmlFor="floatingConfirmPassword" style={{ color: "#3c3c3c" }}>Confirmar Senha</label>
          {errors.confirmPassword && (
            <div className="invalid-feedback">
              {errors.confirmPassword.message}
            </div>
          )}
        </div>

        <div className="form-check form-switch mb-3">
          <input
            className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`}
            type="checkbox"
            style={{ cursor: "pointer" }}
            id="flexSwitchCheckDefault"
            {...register('acceptTerms')}
          />
          <label
            className="form-check-label"
            style={{ cursor: "pointer" }}
            htmlFor="flexSwitchCheckDefault"
          >
            Aceito os termos e condições
          </label>
          {errors.acceptTerms && (
            <div className="invalid-feedback d-block">
              {errors.acceptTerms.message}
            </div>
          )}
        </div>

        {cadastrarUsuario.isError && (
          <div className="alert alert-danger" role="alert">
            Erro ao cadastrar usuário. Tente novamente.
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || cadastrarUsuario.isPending}
          className="btn btn-success rounded-pill fw-bold w-50 align-self-center mt-3"
        >
          {isSubmitting || cadastrarUsuario.isPending ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Cadastrando...
            </>
          ) : (
            <>
              <i className="bi bi-person-plus"></i>&nbsp; Cadastrar
            </>
          )}
        </button>

        <a 
          href="/login" 
          className="btn btn-outline-primary rounded-pill fw-bold w-50 align-self-center mt-3 text-decoration-none"
        >
          <i className="bi bi-arrow-left"></i>&nbsp;Faça login
        </a>
      </form>

      <ConfirmationModal
        isOpen={showSuccessModal}
        onClose={handleModalClose}
        title="Cadastro Realizado!"
        message="Sua conta foi criada com sucesso. Você será redirecionado para a página de login."
        confirmText="Continuar"
        confirmVariant="success"
        icon="success"
      />
    </>
  )
}
