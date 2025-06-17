// src/App.tsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Importe BrowserRouter
import Header from './components/Header/Header'; // Importe o componente Header (que agora gerencia links e rotas)

function App() {
  return (
    <div className="App">
      <BrowserRouter> {/* Adicione o BrowserRouter AQUI */}
        <Header /> {/* Renderize o componente Header aqui */}
      </BrowserRouter>
    </div>
  );
}

export default App;