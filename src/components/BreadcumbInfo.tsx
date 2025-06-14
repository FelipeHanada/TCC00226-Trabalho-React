interface BreadcrumbInfoProps {
  message: string
  dismissible?: boolean
  onClose?: () => void
}

export default function BreadcrumbInfo({
  message,
  dismissible = true,
  onClose,
}: BreadcrumbInfoProps) {
  return (
    <div className={`alert alert-info ${dismissible ? 'alert-dismissible' : ''}`} role="alert">
      <div>{message}</div>
      {dismissible && (
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={onClose}
        ></button>
      )}
    </div>
  )
}
