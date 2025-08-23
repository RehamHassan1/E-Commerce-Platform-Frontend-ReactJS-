import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Ecommerce from './Ecommerce.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Ecommerce />
  </StrictMode>
)
