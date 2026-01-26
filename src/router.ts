import express from 'express';
const router = express.Router();
import memberController from './controllers/member.controller';

// Example route
router.post("/login", memberController.login);
router.post("/signup", memberController.signup);

export default router;