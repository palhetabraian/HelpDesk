import { Router } from 'express';

import { ensureAuthenticated } from '../shared/middlewares/ensure-authenticated';
import { ensureRole } from '../shared/middlewares/ensure-role';

import { sessionsRoutes } from './sessions.routes';
import { usersRoutes } from './users.routes';

export const routes = Router();

routes.get('/health', (request, response) => {
  return response.json({
    status: 'ok',
    message: 'HelpDesk API is running',
  });
});

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

routes.get('/me', ensureAuthenticated, (request, response) => {
  return response.json({ user: request.user });
});

routes.get(
  '/admin-only',
  ensureAuthenticated,
  ensureRole(['ADMIN']),
  (request, response) => {
    return response.json({
      message: 'Voce acessou uma rota exclusiva de Admin.',
    });
  }
);
