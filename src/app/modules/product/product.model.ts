import { Schema, model } from 'mongoose';
import { TInventory, TProduct, TVariants } from './product.interface';

const variantSchema = new Schema<TVariants>({
  type: {
    type: String,
    required: [true, 'Variant type is required.'],
  },
  value: {
    type: String,
    required: [true, 'Variant value is required.'],
  },
});

const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: [true, 'Quantity is required.'],
  },
  inStock: {
    type: Boolean,
    required: [true, 'In-stock status is required.'],
  },
});

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required.'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required.'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Product price is required.'],
  },
  category: {
    type: String,
    required: [true, 'Product category is required.'],
    trim: true,
  },
  tags: {
    type: [String],
    required: [true, 'Product tags are required.'],
  },
  variants: {
    type: [variantSchema],
    required: [true, 'Product variants are required.'],
  },
  inventory: {
    type: inventorySchema,
    required: [true, 'Product inventory is required.'],
  },
});

const Product = model<TProduct>('Product', productSchema);

export default Product;
