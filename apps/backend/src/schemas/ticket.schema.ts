import { z } from 'zod';

export const createTicketSchema = z.object({
  description: z.string().min(10),
  technicianId: z.string().uuid(),
  serviceId: z.string().uuid(),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;

