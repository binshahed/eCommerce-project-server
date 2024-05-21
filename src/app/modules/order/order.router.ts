import { Router } from 'express';

const router = Router();

router.route('/').post().get();

export const orderRouter = router;
