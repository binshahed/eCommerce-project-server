import { TProduct } from './product.interface';
import Product from './product.model';

const createProductIntoDB = async (product: TProduct) => {
  //create product into db
  const result = await Product.create(product);
  return result;
};

const getAllProduct = async (queryParams: { searchTerm?: string }) => {
  //get products into db
  const result = await Product.aggregate([
    queryParams.searchTerm
      ? {
          $match: {
            $or: [
              { name: { $regex: queryParams?.searchTerm, $options: 'i' } },
              {
                description: { $regex: queryParams?.searchTerm, $options: 'i' },
              },
              { category: { $regex: queryParams?.searchTerm, $options: 'i' } },
              { tags: { $in: [queryParams.searchTerm] } },
            ],
          },
        }
      : { $match: {} },
  ]);
  return result;
};

const getProductById = async (productId: string) => {
  //get product by id into db
  const result = await Product.findById(productId);
  if (result === null) {
    throw new Error('product not found');
  }
  return result;
};
const updateProductById = async (productId: string, product: TProduct) => {
  //update product by id into db
  const result = await Product.findByIdAndUpdate(productId, product);
  if (result === null) {
    throw new Error('product not found');
  }
  return result;
};
const deleteProductById = async (productId: string) => {
  //delete product by id into db
  const result = await Product.findByIdAndDelete(productId);
  if (result === null) {
    throw new Error('product not found');
  }

  return result;
};

export const productService = {
  createProductIntoDB,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
