import { Router } from 'express';
import { prisma } from '../infra/database/prisma';

import { ensureAuthenticated } from '../shared/middlewares/ensure-authenticated';

import { sessionsRoutes } from './sessions.routes';
import { usersRoutes } from './users.routes';

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
routes.get('/me', ensureAuthenticated, (request, response) => {
  return response.json({ user: request.user });
});
routes.get('/profile', ensureAuthenticated, async (request, response) => {
  //pegando o user da tabela
  const user = await prisma.user.findUnique({
    where: {
      //passando ! pq o middleware ja validou o token
      id: request.user!.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return response.json(user);
});
