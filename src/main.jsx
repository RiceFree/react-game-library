import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import Routing from './routes/Routing.jsx'

createRoot(document.getElementById('root')).render(
  <Routing />
)
