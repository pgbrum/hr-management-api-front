import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Login from './pages/Auth/Login/Login'; // Corrigi o caminho baseado no seu Routes.tsx
import { AppRoutes } from './Routes';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('token'));

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <div className="App">
          {/* Agora o Header receberá a prop 'onLogout' (vamos corrigir o erro a seguir) */}
          <Header onLogout={handleLogout} />
          <main>
            {/* AppRoutes só será renderizado quando o usuário estiver autenticado */}
            <AppRoutes />
          </main>
          <Footer />
        </div>
      ) : (
        // Se não estiver autenticado, renderiza APENAS o Login, passando a prop necessária
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </BrowserRouter>
  );
}

export default App;
