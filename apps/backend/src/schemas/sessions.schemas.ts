// responsavel por validar os dados do usuario para login
import { z } from 'zod';

// cria o schema de login
export const createSessionsSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

//cria a tipagem para validar o login
export type CreateSessionInput = z.infer<typeof createSessionsSchema>;
