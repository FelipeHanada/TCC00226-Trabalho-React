import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteItem {
  id: number;
  title: string;
  description: string;
  cardImage: string;
  author: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

interface FavoritesState {
  favorites: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      addToFavorites: (item) => {
        const { favorites } = get();
        const existingItem = favorites.find(fav => fav.id === item.id);
        
        if (!existingItem) {
          set({ favorites: [...favorites, item] });
        }
      },
      
      removeFromFavorites: (id) => {
        const { favorites } = get();
        set({ favorites: favorites.filter(fav => fav.id !== id) });
      },
      
      isFavorite: (id) => {
        const { favorites } = get();
        return favorites.some(fav => fav.id === id);
      },
      
      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
);
