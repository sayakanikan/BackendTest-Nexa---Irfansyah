import { Router } from "express";
import { getToken } from "../controllers/authController.js";

const router = Router();
router.post("/token", getToken);

export default router;
