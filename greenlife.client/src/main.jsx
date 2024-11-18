import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RouterConfig from './Router.jsx';  // Importando o componente de roteamento
import './index.css';
import Modal from "react-modal";

// Configurando o elemento principal
Modal.setAppElement('#root');

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterConfig />  {/* Usando RouterConfig para renderizar as rotas */}
    </StrictMode>
);
