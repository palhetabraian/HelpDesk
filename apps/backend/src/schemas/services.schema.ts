import { z } from 'zod';

export const createServiceSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  price: z.coerce.number().positive(),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
