import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Login from './pages/Auth/Login/Login';
import { AppRoutes } from './Routes';
import ScrollToTop from './components/utils/ScrollToTop';
import './App.css';
import './styles/dark-mode.css'; // Importe o CSS do dark mode

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('token'));
  
  // --- Lógica do Dark Mode ---
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    // Aplica a classe ao elemento <html> para o CSS funcionar
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  // --- Fim da Lógica do Dark Mode ---

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      
      {isAuthenticated ? (
        <div className="App">
          {/* Passamos o tema atual e a função de troca para o Header */}
          <Header onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} />
          <main className="main-content">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </BrowserRouter>
  );
}

export default App;