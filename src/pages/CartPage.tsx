import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItemComponent from '../components/CartItemComponent';
import { useCartStore } from '../store/cartStore';

export default function CartPage() {
  const { items, total, clearCart, getItemCount } = useCartStore();
  const navigate = useNavigate();
  const [showClearModal, setShowClearModal] = useState(false);

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleClearCart = () => {
    setShowClearModal(true);
  };

  const confirmClearCart = () => {
    clearCart();
    setShowClearModal(false);
  };

  const cancelClearCart = () => {
    setShowClearModal(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showClearModal) {
        cancelClearCart();
      }
    };

    if (showClearModal) {
      document.addEventListener('keydown', handleKeyDown);
      // Previne scroll do body quando modal está aberto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [showClearModal]);

  if (items.length === 0) {
    return (
      <>
        <div className="container mt-5 mb-5">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <div className="card shadow">
                <div className="card-body p-5">
                  <i className="bi bi-cart-x display-1 text-muted mb-3"></i>
                  <h3 className="text-muted mb-3">Seu carrinho está vazio</h3>
                  <p className="text-muted mb-4">
                    Adicione algumas receitas deliciosas ao seu carrinho para continuar.
                  </p>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={handleContinueShopping}
                  >
                    <i className="bi bi-arrow-left"></i> Continuar Comprando
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold">
                <i className="bi bi-cart3"></i> Meu Carrinho
              </h2>
              <div className="text-muted">
                {getItemCount()} {getItemCount() === 1 ? 'item' : 'itens'}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card shadow">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th scope="col" className="border-0">Produto</th>
                        <th scope="col" className="border-0 text-center">Preço Unitário</th>
                        <th scope="col" className="border-0 text-center">Quantidade</th>
                        <th scope="col" className="border-0 text-center">Preço Total</th>
                        <th scope="col" className="border-0 text-center">Remover</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <CartItemComponent key={item.id} item={item} />
                      ))}
                      <tr className="table-light">
                        <td colSpan={3} className="text-end fw-bold">
                          <strong>Total:</strong>
                        </td>
                        <td className="text-center fw-bold">
                          <strong className="text-success h5">
                            R$ {total.toFixed(2).replace('.', ',')}
                          </strong>
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4 mb-5">
          <div className="col-12">
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-outline-primary"
                onClick={handleContinueShopping}
              >
                <i className="bi bi-arrow-left"></i> Voltar às Compras
              </button>
              
              <div className="d-flex gap-3">
                <button
                  className="btn btn-outline-danger"
                  onClick={handleClearCart}
                >
                  <i className="bi bi-trash"></i> Limpar Carrinho
                </button>
                <button
                  className="btn btn-success btn-lg"
                >
                  <i className="bi bi-credit-card"></i> Fechar Compra
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Confirmação para Limpar Carrinho */}
      {showClearModal && (
        <div 
          className="modal show d-block" 
          tabIndex={-1} 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={cancelClearCart}
        >
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-exclamation-triangle text-warning me-2"></i>
                  Confirmar Ação
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={cancelClearCart}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="text-center">
                  <i className="bi bi-cart-x display-4 text-danger mb-3"></i>
                  <h6 className="mb-3">Tem certeza que deseja limpar todo o carrinho?</h6>
                  <p className="text-muted">
                    Esta ação removerá <strong>{getItemCount()} {getItemCount() === 1 ? 'item' : 'itens'}</strong> do seu carrinho.
                    <br />
                    <strong>Esta ação não pode ser desfeita.</strong>
                  </p>
                  <div className="alert alert-info d-flex align-items-center mt-3">
                    <i className="bi bi-info-circle me-2"></i>
                    <small>
                      Valor total que será perdido: <strong className="text-success">R$ {total.toFixed(2).replace('.', ',')}</strong>
                    </small>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={cancelClearCart}
                >
                  <i className="bi bi-x-circle me-1"></i>
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={confirmClearCart}
                >
                  <i className="bi bi-trash me-1"></i>
                  Sim, Limpar Carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
