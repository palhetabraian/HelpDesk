import { Router } from 'express';

import multer from 'multer';

import { ClientsController } from '../controllers/clients.controller';
import { ensureAuthenticated } from '../shared/middlewares/ensure-authenticated';
import { ensureRole } from '../shared/middlewares/ensure-role';
import { uploadConfig } from '../configs/upload';

export const clientsRoutes = Router();

const clientsController = new ClientsController();
const upload = multer(uploadConfig.MULTER);

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

clientsRoutes.patch(
  '/me/avatar',
  ensureAuthenticated,
  ensureRole(['CLIENT']),
  upload.single('avatar'),
  clientsController.updateAvatar
);

clientsRoutes.delete(
  '/:id',
  ensureAuthenticated,
  ensureRole(['ADMIN']),
  clientsController.delete
);
