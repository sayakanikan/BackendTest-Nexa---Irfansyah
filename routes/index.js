import { Router } from "express";

const router = Router();
router.get("/", function(req, res) {
  res.json({
    authRoutes: {
      POST: "/auth/token"
    },
    karyawanRoute: {
      GET: "/karyawan",
      POST: "/karyawan",
      PUT: "/karyawan/:nip",
      DELETE: "/karyawan/:nip"
    }
  })
});

export default router;
