import multer from "multer";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createKaryawan, getKaryawan, updateKaryawan, deactivateKaryawan } from "../controllers/karyawanController.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", authMiddleware, upload.single("photo"), createKaryawan);
router.get("/", authMiddleware, getKaryawan);
router.put("/:nip", authMiddleware, upload.single("photo"), updateKaryawan);
router.post("/:nip", authMiddleware, deactivateKaryawan);

export default router;
