import { Router } from 'express';

import { SessionController } from '../controllers/sessions.controller';

//inicia a rota de sessao de usuarios
export const sessionsRoutes = Router();

const sessionsController = new SessionController();

sessionsRoutes.post('/', sessionsController.create);
