import { Router } from 'express';

import { ProfileController } from '../controllers/profile.controller';
import { ensureAuthenticated } from '../shared/middlewares/ensure-authenticated';

export const profileRoutes = Router();

const profileController = new ProfileController();

profileRoutes.get('/', ensureAuthenticated, profileController.show);
profileRoutes.patch('/', ensureAuthenticated, profileController.update);
