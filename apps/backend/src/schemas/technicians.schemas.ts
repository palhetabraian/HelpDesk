//valida os dados recebidos ao criar um Técnico
// apenas admin cria Tecnico

import { z } from 'zod';

export const createTechnicianSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(6),
});

export const updateTechnicianSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.email().optional(),
});

export type CreateTechnicianInput = z.infer<typeof createTechnicianSchema>;
export type UpdateTechnicianInput = z.infer<typeof updateTechnicianSchema>;
