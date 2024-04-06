import { Router } from 'express';
import tokenController from '../controllers/TokenController';
import putHeader from '../middlewares/putHeader';

const router = new Router();

router.post('/', putHeader, tokenController.store);

export default router;
