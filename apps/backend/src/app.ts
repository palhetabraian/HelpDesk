import express from 'express';

import { usersRoutes } from './routes/users.routes';
// cria aplicacao backend
export const app = express();

//permite request e response receber json
app.use(express.json());

//rota para testar aplicacao
app.get('/health', (request, response) => {
  return response.json({
    status: 'ok',
    message: 'HelpDesk API is running',
  });
});

app.use('/users', usersRoutes);
