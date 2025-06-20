// src/App.tsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Componentes de Layout Global
import Header from './components/layout/Header/Header';

// Componente que gerencia as rotas
import { AppRoutes } from './Routes';
import Footer from './components/layout/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          {/* O roteamento agora é gerenciado pelo componente AppRoutes */}
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;