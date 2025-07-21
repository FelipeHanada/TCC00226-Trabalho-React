import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useFavoritesStore } from '../store/favoritesStore';

export const useSyncFavorites = () => {
  const { isAuthenticated, token } = useAuthStore();
  const { loadFavorites } = useFavoritesStore();

  useEffect(() => {
    if (isAuthenticated && token) {
      loadFavorites(token);
    }
  }, [isAuthenticated, token, loadFavorites]);
};

export default useSyncFavorites;
