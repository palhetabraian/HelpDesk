import { Router } from 'express';

import { ClientsController } from '../controllers/clients.controller';
import { ensureAuthenticated } from '../shared/middlewares/ensure-authenticated';
import { ensureRole } from '../shared/middlewares/ensure-role';

export const clientsRoutes = Router();

const clientsController = new ClientsController();

clientsRoutes.get(
  '/',
  ensureAuthenticated,
  ensureRole(['ADMIN']),
  clientsController.index
);

clientsRoutes.patch(
  '/:id',
  ensureAuthenticated,
  ensureRole(['ADMIN']),
  clientsController.update
);
