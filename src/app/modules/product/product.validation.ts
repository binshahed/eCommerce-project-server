import { z } from 'zod';

const variants = z.array(
  z.object({
    type: z
      .string()
      .trim()
      .min(1, { message: 'Variant type is required and cannot be empty.' }),
    value: z
      .string()
      .trim()
      .min(1, { message: 'Variant value is required and cannot be empty.' }),
  }),
);

const inventory = z.object({
  quantity: z.number().min(1, { message: 'Quantity must be at least 1.' }),
  inStock: z.boolean({ required_error: 'In-stock status is required.' }),
});

export const ProductValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, {
      message: 'Name is required and must be at least 1 character long.',
    }),
  description: z
    .string()
    .trim()
    .min(5, {
      message:
        'Description is required and must be at least 5 characters long.',
    }),
  price: z
    .number()
    .min(0, { message: 'Price is required and must be at least 0.' }),
  category: z
    .string()
    .trim()
    .min(1, { message: 'Category is required and cannot be empty.' }),
  tags: z
    .array(
      z
        .string()
        .trim()
        .min(2, { message: 'Each tag must be at least 2 characters long.' }),
    )
    .nonempty({ message: 'Tags array cannot be empty.' }),
  variants: variants,
  inventory: inventory,
});
