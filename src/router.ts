import express from 'express';
const router = express.Router();
import memberController from './controllers/member.controller';

// Example route
router.get('/', memberController.goHome);

router.get("/login", memberController.goLogin);

router.get("/signup", memberController.goSignup);

export default router;