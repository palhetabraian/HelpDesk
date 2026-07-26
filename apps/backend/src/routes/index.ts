import { Router } from 'express';

import { usersRoutes } from './users.routes';

export const routes = Router();

routes.get('/health', (request, response) => {
  return response.json({
    status: 'ok',
    message: 'HelpDesk API is running',
  });
});

routes.use('/users', usersRoutes);
