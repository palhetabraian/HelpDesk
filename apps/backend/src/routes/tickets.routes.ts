import { Router } from 'express';

import { TicketsController } from '../controllers/ticket.controller';
import { ensureAuthenticated } from '../shared/middlewares/ensure-authenticated';
import { ensureRole } from '../shared/middlewares/ensure-role';

export const ticketsRoutes = Router();

const ticketsController = new TicketsController();

ticketsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureRole(['CLIENT']),
  ticketsController.create
);

ticketsRoutes.get(
  '/me',
  ensureAuthenticated,
  ensureRole(['CLIENT']),
  ticketsController.indexByClient
);

ticketsRoutes.get(
  '/technician',
  ensureAuthenticated,
  ensureRole(['TECHNICIAN']),
  ticketsController.indexByTechnician
);

ticketsRoutes.get(
  '/',
  ensureAuthenticated,
  ensureRole(['ADMIN']),
  ticketsController.index
);

ticketsRoutes.post(
  '/:id/services',
  ensureAuthenticated,
  ensureRole(['TECHNICIAN']),
  ticketsController.addService
);
