import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ClientsListPage } from '../pages/admin/clients-list'
import { TicketDetailsPage } from '../pages/admin/ticket-details'
import { TechnicianProfilePage } from '../pages/admin/technician-profile'
import { TechniciansListPage } from '../pages/admin/technicians-list'
import { TicketsListPage } from '../pages/admin/tickets-list'
import { LoginPage } from '../pages/auth/login'
import { RegisterPage } from '../pages/auth/register'
import { NotFoundPage } from '../pages/shared/not-found'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/tickets" element={<TicketsListPage />} />
        <Route path="/admin/tickets/:ticketId" element={<TicketDetailsPage />} />
        <Route path="/admin/technicians" element={<TechniciansListPage />} />
        <Route path="/admin/technicians/new" element={<TechnicianProfilePage />} />
        <Route
          path="/admin/technicians/:technicianId/edit"
          element={<TechnicianProfilePage />}
        />
        <Route path="/admin/clients" element={<ClientsListPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
