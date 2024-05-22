/* eslint-disable @typescript-eslint/no-explicit-any */
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

  return result;
};
const updateProductById = async (productId: string, product: any) => {
  // Update product by id in the database
  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId },
    { $set: product },
    { new: true, runValidators: true },
  );

  return updatedProduct;
};

const deleteProductById = async (productId: string) => {
  //delete product by id into db
  const result = await Product.findByIdAndDelete(productId);

  return result;
};

export const productService = {
  createProductIntoDB,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
