/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { productService } from './product.service';
import {
  PartialProductValidationSchema,
  ProductValidationSchema,
} from './product.validation';
import { ZodError } from 'zod';
import { TProduct } from './product.interface';

export const createProduct = async (rec: Request, res: Response) => {
  try {
    const productData: TProduct = rec.body;
    // zod validation
    const validateData = ProductValidationSchema.parse(productData);
    // create product into db
    const product = await productService.createProductIntoDB(validateData);
    // send status
    res.status(200).send({
      success: true,
      message: 'Product created successfully!',
      data: product,
    });
  } catch (error: any) {
    // zod error handling
    if (error instanceof ZodError) {
      const validationErrors = error.errors.map(
        (err) => err.path[0] + ' ' + err.message,
      );
      res.status(400).send({
        success: false,
        message: validationErrors[0],
      });
    } else {
      // Handle other types of errors
      res.status(500).send({
        success: false,
        message: error.message || 'Internal server error.',
      });
    }
  }
};

export const getAllProduct = async (rec: Request, res: Response) => {
  const searchQuery = rec.query;
  try {
    // get all products
    const products = await productService.getAllProduct(searchQuery);
    if (products.length === 0) {
      throw new Error('product not found');
    }
    res.status(200).send({
      success: true,
      message: searchQuery.searchTerm
        ? `Products matching search term '${searchQuery.searchTerm}' fetched successfully!`
        : 'Products fetched successfully!',
      data: products,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'Internal server error.',
    });
  }
};

export const getProductById = async (rec: Request, res: Response) => {
  try {
    const productId = rec.params.productId;

    // get product by id
    const product = await productService.getProductById(productId);

    // send response in product not found
    if (product === null) {
      throw new Error('product not found');
    }
    res.status(200).send({
      success: true,
      message: 'Product fetched successfully!',
      data: product,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'Internal server error.',
    });
  }
};
export const updateProductById = async (req: Request, res: Response) => {
  try {
    const productId: string | undefined = req.params.productId;
    const productData = req.body;

    // Validate the partial data with strict validation
    const validateData = PartialProductValidationSchema.parse(productData);

    // update product by id
    const product = await productService.updateProductById(
      productId,
      validateData,
    );

    // send response in product not found
    if (product === null) {
      throw new Error('Product not found');
    }

    res.status(200).send({
      success: true,
      message: 'Product updated successfully!',
      data: product,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      res.status(400).send({
        success: false,
        message: error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        }))[0].message,
      });
    } else {
      res.status(500).send({
        success: false,
        message: error.message || 'Internal server error.',
      });
    }
  }
};
export const deleteProductById = async (rec: Request, res: Response) => {
  try {
    const productId: string | undefined = rec.params.productId;
    // delete product by id
    const deletedData = await productService.deleteProductById(productId);

    // send response in product not found
    if (deletedData === null) {
      throw new Error('product not found');
    }

    res.status(200).send({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'Internal server error.',
    });
  }
};
