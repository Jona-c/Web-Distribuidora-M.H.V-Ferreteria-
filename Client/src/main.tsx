import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { CarritoProvider } from './context/CarritoContext.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppRouter from './router/router.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <CarritoProvider>
        <AppRouter />
      </CarritoProvider>
    </AuthProvider>
  </BrowserRouter>
)