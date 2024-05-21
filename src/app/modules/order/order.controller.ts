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
    let order;

    if (orderQuantity > productQuantity) {
      throw new Error('order quantity is greater than product quantity');
    }

    if (productQuantity - orderQuantity < 0) {
      throw new Error('Insufficient quantity available in inventory');
    }

    if (productQuantity - orderQuantity === 0) {
      await productService.updateProductById(validateData.productId, {
        inventory: {
          quantity: 0,
          inStock: false,
        },
      });
      order = await orderService.createOrder(validateData);
    } else {
      await productService.updateProductById(validateData.productId, {
        inventory: {
          quantity: productQuantity - orderQuantity,
        },
      });
      order = await orderService.createOrder(validateData);
    }

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
