import { Router } from 'express';
import { createProduct } from './product.controler';

const router = Router();

router.route('/').get(createProduct);

export const productRouter = router;
