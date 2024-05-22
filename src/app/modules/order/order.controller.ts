/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { OrderValidationSchema } from './order.validation';
import { orderService } from './order.service';
import { productService } from '../product/product.service';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const validateData = OrderValidationSchema.parse(orderData);
    const product = await productService.getProductById(orderData.productId);
    if (product === null) {
      throw new Error('product not found');
    }

    const orderQuantity = validateData.quantity;
    const productQuantity = product.inventory.quantity;

    if (orderQuantity > productQuantity) {
      throw new Error('order quantity is greater than product quantity');
    }

    if (productQuantity - orderQuantity < 0) {
      throw new Error('Insufficient quantity available in inventory');
    }

    const newQuantity = productQuantity - orderQuantity;
    const inStock = newQuantity > 0;

    await productService.updateProductById(validateData.productId, {
      inventory: {
        quantity: newQuantity,
        inStock: inStock,
      },
    });
    const order = await orderService.createOrder(validateData);

    res.status(200).send({
      success: true,
      message: 'order created successfully',
      data: order,
    });
  } catch (err: any) {
    res.status(404).send({
      success: false,
      message: err.message,
    });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    let queryEmail: string | undefined;

    // Check if req.query.email exists and is a string
    if (typeof req.query.email === 'string') {
      queryEmail = req.query.email;
    }
    const orders = await orderService.getOrders(queryEmail);

    if (orders.length === 0) {
      throw new Error('orders not found');
    }

    res.status(200).send({
      success: true,
      message: queryEmail
        ? 'Orders fetched successfully for user email!'
        : 'orders fetched successfully',
      data: orders,
    });
  } catch (err: any) {
    res.status(404).send({
      success: false,
      message: err.message,
    });
  }
};
