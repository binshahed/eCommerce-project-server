import { Router } from 'express';
import { createProduct } from './product.controller';

const router = Router();

router.route('/').post(createProduct);

export const productRouter = router;
