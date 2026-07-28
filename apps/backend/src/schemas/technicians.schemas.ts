//valida os dados recebidos ao criar um Técnico
// apenas admin cria Tecnico

import { z } from 'zod';

export const createTechnicianSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(6),
});

export type CreateTechnicianInput = z.infer<typeof createTechnicianSchema>;
