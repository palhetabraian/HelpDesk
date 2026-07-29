//valida os dados recebidos ao criar um Técnico
// apenas admin cria Tecnico

import { z } from 'zod';

//schema de horario dos tecnicos
const availableHoursSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):00$/, 'Horario invalido. Use o formato HH:00.');

export const createTechnicianSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(6),
});

export const updateTechnicianSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.email().optional(),
});

export const updateTechnicianAvailableHoursSchema = z.object({
  availableHours: z.array(availableHoursSchema).min(1),
});

export type CreateTechnicianInput = z.infer<typeof createTechnicianSchema>;
export type UpdateTechnicianInput = z.infer<typeof updateTechnicianSchema>;
export type updateTechnicianAvailableHoursInput = z.infer<
  typeof updateTechnicianAvailableHoursSchema
>;
