import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/main.scss';

// add portal root to the document body
const portalRoot = document.createElement('div');
portalRoot.id = 'portal-root';
document.body.appendChild(portalRoot);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
