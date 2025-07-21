import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routes/router';

function App() {
  useEffect(() => {
    localStorage.clear();
    
    if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
      window.location.href = '/login';
    }
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
