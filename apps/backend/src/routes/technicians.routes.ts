//rotas de tecnicos.
import { Router } from 'express';

import { TechniciansController } from '../controllers/technicians.controller';
import { ensureAuthenticated } from '../shared/middlewares/ensure-authenticated';
import { ensureRole } from '../shared/middlewares/ensure-role';

export const techniciansRoutes = Router();

const techniciansController = new TechniciansController();

//rota protegida  somente Admin pode acessar
techniciansRoutes.post(
  '/',
  ensureAuthenticated,
  ensureRole(['ADMIN']),
  techniciansController.create
);
