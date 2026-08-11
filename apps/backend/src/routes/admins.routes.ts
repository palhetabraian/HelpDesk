import { Router } from 'express';

import { AdminsController } from '../controllers/admins.controller';
import { ensureAuthenticated } from '../shared/middlewares/ensure-authenticated';
import { ensureRole } from '../shared/middlewares/ensure-role';

export const adminsRoutes = Router();

const adminsController = new AdminsController();

adminsRoutes.get(
  '/',
  ensureAuthenticated,
  ensureRole(['ADMIN']),
  adminsController.index
);

adminsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureRole(['ADMIN']),
  adminsController.create
);

adminsRoutes.patch(
  '/:id',
  ensureAuthenticated,
  ensureRole(['ADMIN']),
  adminsController.update
);

adminsRoutes.delete(
  '/:id',
  ensureAuthenticated,
  ensureRole(['ADMIN']),
  adminsController.delete
);
