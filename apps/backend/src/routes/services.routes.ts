import { Router } from 'express';

import { ServicesController } from '../controllers/service.controller';
import { ensureAuthenticated } from '../shared/middlewares/ensure-authenticated';
import { ensureRole } from '../shared/middlewares/ensure-role';

export const servicesRoutes = Router();

const servicesController = new ServicesController();

servicesRoutes.get('/', ensureAuthenticated, servicesController.index);

servicesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureRole(['ADMIN']),
  servicesController.create
);
