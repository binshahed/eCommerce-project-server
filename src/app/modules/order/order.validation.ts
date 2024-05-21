import { z } from 'zod';

export const OrderValidationSchema = z.object({
  email: z.string().email().trim(),
  productId: z.string().trim(),
  price: z.number(),
  quantity: z.number().min(1).default(1),
});
