import { Router } from 'express';
import { createOrder, getOrders } from './order.controller';

const router = Router();

router.route('/').post(createOrder).get(getOrders);

export const orderRouter = router;
