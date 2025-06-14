import { useState } from 'react'

export interface AlertProps {
  message: string
  type?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
  dismissible?: boolean
}

export default function Alert({
  message,
  type = 'info',
  dismissible = true,
}: AlertProps) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div
      className={`alert alert-${type} ${dismissible ? 'alert-dismissible' : ''} mt-3 mb-3`}
      role="alert"
    >
      <div>{message}</div>
      {dismissible && (
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => setVisible(false)}
        />
      )}
    </div>
  )
}
