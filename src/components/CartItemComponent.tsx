import { useEffect, useRef, useState } from 'react';
import type { CartItem } from '../store/cartStore';
import { useCartStore } from '../store/cartStore';

interface CartItemComponentProps {
  item: CartItem;
}

export default function CartItemComponent({ item }: CartItemComponentProps) {
  const { updateQuantity, removeItem, getItemSubtotal } = useCartStore();
  const [quantity, setQuantity] = useState<string>(item.quantity.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuantity(item.quantity.toString());
  }, [item.quantity]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuantity(value);
    
    const newQuantity = parseInt(value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleQuantityBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    
    if (value === '' || parseInt(value) <= 0 || isNaN(parseInt(value))) {
      e.preventDefault();
      if (inputRef.current) {
        setTimeout(() => {
          inputRef.current?.focus();
          inputRef.current?.select();
        }, 10);
      }
      return;
    }
    
    const numValue = parseInt(value);
    setQuantity(numValue.toString());
    updateQuantity(item.id, numValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' || e.key === 'Enter') {
      const value = e.currentTarget.value.trim();
      if (value === '' || parseInt(value) <= 0 || isNaN(parseInt(value))) {
        e.preventDefault();
        setTimeout(() => {
          inputRef.current?.focus();
          inputRef.current?.select();
        }, 10);
      }
    }
  };

  const handleRemoveItem = () => {
    removeItem(item.id);
  };

  const subtotal = getItemSubtotal(item.id);

  return (
    <tr>
      <td className="align-middle">
        <div className="d-flex align-items-center">
          <img 
            src={item.image} 
            alt={item.title}
            className="rounded me-3"
            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
          />
          <div>
            <h6 className="mb-0">{item.title}</h6>
            <small className="text-muted">{item.author}</small>
          </div>
        </div>
      </td>
      <td className="align-middle text-center">
        <strong>R$ {item.price.toFixed(2).replace('.', ',')}</strong>
      </td>
      <td className="align-middle text-center">
        <div className="d-flex justify-content-center">
          <input
            ref={inputRef}
            type="number"
            className="form-control text-center"
            style={{ width: '80px' }}
            value={quantity}
            onChange={handleQuantityChange}
            onBlur={handleQuantityBlur}
            onKeyDown={handleKeyDown}
            min="1"
          />
        </div>
      </td>
      <td className="align-middle text-center">
        <strong>R$ {subtotal.toFixed(2).replace('.', ',')}</strong>
      </td>
      <td className="align-middle text-center">
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleRemoveItem}
          title="Remover item"
        >
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  );
}
