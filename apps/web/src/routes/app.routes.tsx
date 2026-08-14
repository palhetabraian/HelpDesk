import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { LoginPage } from '../pages/auth/login'
import { RegisterPage } from '../pages/auth/register'
import { NotFoundPage } from '../pages/shared/not-found'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
