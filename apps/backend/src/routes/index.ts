import { Router } from 'express';

import { authRoutes } from './auth.routes';
import { adminsRoutes } from './admins.routes';
import { profileRoutes } from './profile.routes';
import { sessionsRoutes } from './sessions.routes';
import { techniciansRoutes } from './technicians.routes';
import { usersRoutes } from './users.routes';
import { servicesRoutes } from './services.routes';
import { clientsRoutes } from './client.routes';
import { ticketsRoutes } from './tickets.routes';

export const routes = Router();
// rota para testar se ta funcionando a api
routes.get('/health', (request, response) => {
  return response.json({
    status: 'ok',
    message: 'HelpDesk API is running',
  });
});

// rotas publicas
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

// Rotas protegidas
routes.use(authRoutes);
routes.use('/admins', adminsRoutes);
routes.use('/profile', profileRoutes);
routes.use('/technicians', techniciansRoutes);
routes.use('/services', servicesRoutes);
routes.use('/clients', clientsRoutes);
routes.use('/tickets', ticketsRoutes);
