interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmText?: string;
  confirmVariant?: 'primary' | 'success' | 'danger' | 'warning';
  icon?: 'success' | 'error' | 'warning' | 'info';
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  title,
  message,
  confirmText = 'OK',
  confirmVariant = 'primary',
  icon = 'success'
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const getIconElement = () => {
    switch (icon) {
      case 'success':
        return (
          <div className="text-success mb-3">
            <i className="bi bi-check-circle-fill" style={{ fontSize: '3rem' }}></i>
          </div>
        );
      case 'error':
        return (
          <div className="text-danger mb-3">
            <i className="bi bi-x-circle-fill" style={{ fontSize: '3rem' }}></i>
          </div>
        );
      case 'warning':
        return (
          <div className="text-warning mb-3">
            <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '3rem' }}></i>
          </div>
        );
      case 'info':
        return (
          <div className="text-info mb-3">
            <i className="bi bi-info-circle-fill" style={{ fontSize: '3rem' }}></i>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div 
        className="modal-backdrop fade show" 
        style={{ zIndex: 1040 }}
        onClick={onClose}
      ></div>
      
      <div 
        className="modal fade show d-block" 
        style={{ zIndex: 1050 }}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="confirmationModalLabel"
        aria-hidden="false"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center py-4">
              {getIconElement()}
              <h4 className="modal-title mb-3 fw-bold" id="confirmationModalLabel">
                {title}
              </h4>
              <p className="text-muted mb-4">
                {message}
              </p>
              <button
                type="button"
                className={`btn btn-${confirmVariant} px-4 rounded-pill fw-bold`}
                onClick={onClose}
              >
                <i className="bi bi-arrow-right me-1"></i>
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
