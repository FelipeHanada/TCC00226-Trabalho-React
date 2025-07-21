import axios from 'axios';
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

interface BackendArticle {
  id: number;
  title: string;
  description: string;
  cardImage: string;
  contentMD: string;
  publishedAt: string;
  author: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    aboutMe: string;
  };
}

interface PageResult<T> {
  items: T[];
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}

interface FavoritesState {
  favorites: FavoriteItem[];
  loading: boolean;
  error: string | null;
  loadFavorites: (token: string) => Promise<void>;
  addToFavorites: (item: FavoriteItem, token: string) => Promise<void>;
  removeFromFavorites: (id: number, token: string) => Promise<void>;
  isFavorite: (id: number) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      loading: false,
      error: null,
      
      loadFavorites: async (token: string) => {
        try {
          set({ loading: true, error: null });
          
          const response = await axios.get<PageResult<BackendArticle>>(
            `http://localhost:8080/article/favorite/${token}?page=0&pageSize=100`
          );
          
          const favorites: FavoriteItem[] = response.data.items.map(article => ({
            id: article.id,
            title: article.title,
            description: article.description,
            cardImage: article.cardImage,
            author: {
              id: article.author.id,
              firstName: article.author.firstName,
              lastName: article.author.lastName
            }
          }));
          
          set({ favorites, loading: false });
        } catch (error) {
          console.error('Erro ao carregar favoritos:', error);
          set({ 
            error: 'Erro ao carregar favoritos do servidor.',
            loading: false 
          });
        }
      },
      
      addToFavorites: async (item: FavoriteItem, token: string) => {
        try {
          set({ error: null });
          
          await axios.post(
            `http://localhost:8080/article/favorite/${item.id}?token=${token}`
          );
          
          const { favorites } = get();
          const existingItem = favorites.find(fav => fav.id === item.id);
          
          if (!existingItem) {
            set({ favorites: [...favorites, item] });
          }
        } catch (error) {
          console.error('Erro ao adicionar favorito:', error);
          set({ error: 'Erro ao adicionar favorito.' });
          throw error;
        }
      },
      
      removeFromFavorites: async (id: number, token: string) => {
        try {
          set({ error: null });
          
          await axios.delete(
            `http://localhost:8080/article/favorite/remove/${id}?token=${token}`
          );
          
          const { favorites } = get();
          set({ favorites: favorites.filter(fav => fav.id !== id) });
        } catch (error) {
          console.error('Erro ao remover favorito:', error);
          set({ error: 'Erro ao remover favorito.' });
          throw error;
        }
      },
      
      isFavorite: (id: number) => {
        const { favorites } = get();
        return favorites.some(fav => fav.id === id);
      },
      
      clearFavorites: () => {
        set({ favorites: [], error: null });
      },
    }),
    {
      name: 'favorites-storage',
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
