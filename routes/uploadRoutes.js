import express from 'express';
import multer from 'multer';
import { handleUpload } from '../controller/uploadController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'),  (req, res, next) => {
    
    next();
  }, handleUpload);

export default router;
