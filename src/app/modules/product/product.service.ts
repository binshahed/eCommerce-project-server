import { TProduct } from './product.interface';
import Product from './product.model';

const createProductIntoDB = async (product: TProduct) => {
  //create product into db
  const result = await Product.create(product);
  return result;
};

export const productService = {
  createProductIntoDB,
};
