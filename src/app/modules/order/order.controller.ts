/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { OrderValidationSchema } from './order.validation';
import { orderService } from './order.service';
import { productService } from '../product/product.service';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    // validate order
    const validateData = OrderValidationSchema.parse(orderData);
    // check if product exists
    const product = await productService.getProductById(orderData.productId);
    if (product === null) {
      throw new Error('product not found');
    }

    const orderQuantity = validateData.quantity;
    const productQuantity = product.inventory.quantity;

    // check if order quantity is greater than product quantity
    if (orderQuantity > productQuantity) {
      throw new Error('order quantity is greater than product quantity');
    }

    // check if order quantity is greater than product quantity
    if (productQuantity - orderQuantity < 0) {
      throw new Error('Insufficient quantity available in inventory');
    }
    // calculate remaining quantity
    const newQuantity = productQuantity - orderQuantity;

    // when inStock is true and when false
    const inStock = newQuantity > 0;

    // order price and product price should be same
    validateData.price = product.price;

    await productService.updateProductById(validateData.productId, {
      inventory: {
        quantity: newQuantity,
        inStock: inStock,
      },
    });
    // create order in db
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
    // get orders from db
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
