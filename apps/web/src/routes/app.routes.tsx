import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ClientsListPage } from '../pages/admin/clients-list'
import { ServicesListPage } from '../pages/admin/services-list'
import { TicketDetailsPage } from '../pages/admin/ticket-details'
import { TechnicianProfilePage } from '../pages/admin/technician-profile'
import { TechniciansListPage } from '../pages/admin/technicians-list'
import { TicketsListPage } from '../pages/admin/tickets-list'
import { LoginPage } from '../pages/auth/login'
import { RegisterPage } from '../pages/auth/register'
import { ClientTicketDetailsPage } from '../pages/client/client-ticket-details'
import { ClientTicketsListPage } from '../pages/client/client-tickets-list'
import { NotFoundPage } from '../pages/shared/not-found'
import { TechnicianProfilePage as TechnicianOwnProfilePage } from '../pages/technician/technician-profile'
import { TechnicianTicketDetailsPage } from '../pages/technician/technician-ticket-details'
import { TechnicianTicketsListPage } from '../pages/technician/technician-tickets-list'

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
        <Route path="/admin/services" element={<ServicesListPage />} />
        <Route path="/technician/tickets" element={<TechnicianTicketsListPage />} />
        <Route
          path="/technician/tickets/:ticketId"
          element={<TechnicianTicketDetailsPage />}
        />
        <Route
          path="/technician/profile"
          element={<TechnicianOwnProfilePage />}
        />
        <Route path="/client/tickets" element={<ClientTicketsListPage />} />
        <Route
          path="/client/tickets/:ticketId"
          element={<ClientTicketDetailsPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
