import { Router } from 'express';

import { AuthController } from '../controllers/auth.controller';
import { ensureAuthenticated } from '../shared/middlewares/ensure-authenticated';

export const authRoutes = Router();

const authController = new AuthController();

authRoutes.get('/me', ensureAuthenticated, authController.me);
