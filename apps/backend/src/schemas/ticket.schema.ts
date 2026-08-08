import { z } from 'zod';

export const createTicketSchema = z.object({
  description: z.string().min(10),
  technicianId: z.string().uuid(),
  serviceId: z.string().uuid(),
});

export const addTicketServiceSchema = z.object({
  serviceId: z.string().uuid(),
});

export const updateTicketStatusSchema = z.object({
  status: z.enum(['ABERTO', 'EM_ATENDIMENTO', 'ENCERRADO']),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
export type AddTicketServiceInput = z.infer<typeof addTicketServiceSchema>;
export type UpdateTicketStatusInput = z.infer<typeof updateTicketStatusSchema>;

