import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import WelcomePage from './pages/welcomePage.jsx';

import DentistHome from './pages/dentistHome.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DentistHome />
  </StrictMode>,
)
