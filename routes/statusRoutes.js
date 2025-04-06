import express from 'express';
import { checkStatus } from '../controller/statusController.js';

const router = express.Router();

router.get('/:requestId', checkStatus);

export default router;
