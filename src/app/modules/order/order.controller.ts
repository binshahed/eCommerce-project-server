/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { OrderValidationSchema } from './order.validation';
import { orderService } from './order.service';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const validateData = OrderValidationSchema.parse(orderData);
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
