//rotas de tecnicos.
import { Router } from 'express';

import { TechniciansController } from '../controllers/technicians.controller';
import { ensureAuthenticated } from '../shared/middlewares/ensure-authenticated';
import { ensureRole } from '../shared/middlewares/ensure-role';

export const techniciansRoutes = Router();

const techniciansController = new TechniciansController();

//rota para alterar senha pos primeiro login
techniciansRoutes.patch(
  '/me/password',
  ensureAuthenticated,
  ensureRole(['TECHNICIAN']),
  techniciansController.updatePassword
);

//rota protegida  somente Admin pode acessar

techniciansRoutes.get(
  '/',
  ensureAuthenticated,
  ensureRole(['ADMIN']),
  techniciansController.index
);

techniciansRoutes.post(
  '/',
  ensureAuthenticated,
  ensureRole(['ADMIN']),
  techniciansController.create
);

techniciansRoutes.patch(
  '/:id',
  ensureAuthenticated,
  ensureRole(['ADMIN']),
  techniciansController.update
);

techniciansRoutes.patch(
  '/:id/available-hours',
  ensureAuthenticated,
  ensureRole(['ADMIN']),
  techniciansController.updateAvailableHours
);
