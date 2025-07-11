import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  title: string;
  author: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getItemSubtotal: (id: string) => number;
  calculateTotal: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      
      addItem: (item) => {
        const existingItem = get().items.find(i => i.id === item.id);
        
        if (existingItem) {
          set(state => ({
            items: state.items.map(i =>
              i.id === item.id 
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          }));
        } else {
          set(state => ({
            items: [...state.items, { ...item, quantity: 1 }]
          }));
        }
        
        get().calculateTotal();
      },
      
      removeItem: (id) => {
        set(state => ({
          items: state.items.filter(item => item.id !== id)
        }));
        get().calculateTotal();
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        set(state => ({
          items: state.items.map(item =>
            item.id === id 
              ? { ...item, quantity }
              : item
          )
        }));
        get().calculateTotal();
      },
      
      clearCart: () => {
        set({ items: [], total: 0 });
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
      
      getItemSubtotal: (id) => {
        const item = get().items.find(i => i.id === id);
        return item ? item.price * item.quantity : 0;
      },
      
      calculateTotal: () => {
        const total = get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        set({ total });
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ 
        items: state.items, 
        total: state.total 
      }),
    }
  )
);
