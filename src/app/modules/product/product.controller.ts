/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { productService } from './product.service';
import { ProductValidationSchema } from './product.validation';
import { ZodError } from 'zod';

export const createProduct = async (rec: Request, res: Response) => {
  try {
    const productData = rec.body;
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
        message: 'Validation failed.',
        errors: validationErrors,
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
    const products = await productService.getAllProduct(searchQuery);
    res.status(200).send({
      success: true,
      message: 'Products fetched successfully!',
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

    const product = await productService.getProductById(productId);
    console.log(product);
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

export const updateProductById = async (rec: Request, res: Response) => {
  try {
    const productId = rec.params.productId;
    const productData = rec.body;
    const validateData = ProductValidationSchema.parse(productData);
    const product = await productService.updateProductById(
      productId,
      validateData,
    );
    res.status(200).send({
      success: true,
      message: 'Product updated successfully!',
      data: product,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'Internal server error.',
    });
  }
};
export const deleteProductById = async (rec: Request, res: Response) => {
  try {
    const productId = rec.params.productId;
    const deletedData = await productService.deleteProductById(productId);
    console.log(deletedData);

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
