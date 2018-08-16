import express from 'express';
import { verifyUser, signin } from './auth';

const router = express.Router();

router.post('/', verifyUser(), signin);

export default router;
