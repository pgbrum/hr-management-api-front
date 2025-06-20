// src/App.tsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Componentes de Layout Global
import Header from './components/Header/Header';

// Componente que gerencia as rotas
import { AppRoutes } from './Routes';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          {/* O roteamento agora é gerenciado pelo componente AppRoutes */}
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;