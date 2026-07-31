import { Router } from 'express';

import { authRoutes } from './auth.routes';
import { profileRoutes } from './profile.routes';
import { sessionsRoutes } from './sessions.routes';
import { techniciansRoutes } from './technicians.routes';
import { usersRoutes } from './users.routes';
import { servicesRoutes } from './services.routes';

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
routes.use('/profile', profileRoutes);
routes.use('/technicians', techniciansRoutes);
routes.use('/services', servicesRoutes);
