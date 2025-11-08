import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import Login from './pages/conta/login.jsx'
import Cadastro from './pages/conta/cadastro.jsx'
import Usuario from './pages/perfil/usuario.jsx';

import './index.scss'
import { AuthProvider } from './context/context.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<Usuario />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
