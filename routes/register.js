import express from 'express';
import { registerUser } from '../controllers/registerController.js'; // Import login admin controller

const router = express.Router();

router.post('/', registerUser);

export default router;
