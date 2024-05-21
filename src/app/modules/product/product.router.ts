import { Router } from 'express';
import {
  createProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} from './product.controller';

const router = Router();

router.route('/').post(createProduct).get(getAllProduct);
router
  .route('/:productId')
  .get(getProductById)
  .put(updateProductById)
  .delete(deleteProductById);

export const productRouter = router;
