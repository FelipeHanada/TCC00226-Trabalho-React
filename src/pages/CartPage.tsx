import { useNavigate } from 'react-router-dom';
import CartItemComponent from '../components/CartItemComponent';
import { useCartStore } from '../store/cartStore';

export default function CartPage() {
  const { items, total, clearCart, getItemCount } = useCartStore();
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleClearCart = () => {
    if (window.confirm('Tem certeza que deseja limpar o carrinho?')) {
      clearCart();
    }
  };

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
    </>
  );
}
