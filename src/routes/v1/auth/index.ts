import { Router } from "express";
import { login, register, logout, whoami } from "../../../controllers/index";
import { authMiddleware } from "../../../middlewares";

const router: Router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/whoami", authMiddleware, whoami);

export default router;
