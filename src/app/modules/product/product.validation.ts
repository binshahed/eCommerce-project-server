import { z } from 'zod';

const variants = z.array(
  z.object({
    type: z
      .string({
        required_error: 'Variant type is required and cannot be empty.',
      })
      .trim()
      .min(1, { message: 'Variant type is required and cannot be empty.' }),
    value: z
      .string({
        required_error: 'Variant value is required and cannot be empty.',
      })
      .trim()
      .min(1, { message: 'Variant value is required and cannot be empty.' }),
  }),
);

const inventory = z.object({
  quantity: z
    .number({
      required_error: 'Quantity is required and must be at least 1.',
    })
    .min(1, { message: 'Quantity must be at least 1.' }),
  inStock: z.boolean({ required_error: 'In-stock status is required.' }),
});

export const ProductValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required and must be at least 1 character long.',
    })
    .trim()
    .min(1, {
      message: 'Name is required and must be at least 1 character long.',
    }),
  description: z
    .string({
      required_error:
        'Description is required and must be at least 5 characters long.',
    })
    .trim()
    .min(5, {
      message:
        'Description is required and must be at least 5 characters long.',
    }),
  price: z
    .number({
      required_error: 'Price is required and must be at least 0.',
    })
    .min(0, { message: 'Price is required and must be at least 0.' }),
  category: z
    .string({
      required_error: 'Category is required and cannot be empty.',
    })
    .trim()
    .min(1, { message: 'Category is required and cannot be empty.' }),
  tags: z
    .array(
      z
        .string({
          required_error: 'Each tag must be at least 2 characters long.',
        })
        .trim()
        .min(2, { message: 'Each tag must be at least 2 characters long.' }),
    )
    .nonempty({ message: 'Tags array cannot be empty.' }),
  variants: variants,
  inventory: inventory,
});

// update product partial validation
export const PartialProductValidationSchema =
  ProductValidationSchema.partial().strict();
