import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import RegisterPage from './RegisterPage.jsx'
import Dashboard from './Dashboard.jsx'


import './index.css'
import PractisePage from './PractisePage.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Dashboard />
  </StrictMode>,
)
