import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { LoginPage } from '../pages/auth/login'
import { NotFoundPage } from '../pages/shared/not-found'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
