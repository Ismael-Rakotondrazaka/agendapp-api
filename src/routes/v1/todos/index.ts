import { Router } from "express";
import { storeTodos } from "../../../controllers";
import { authMiddleware } from "../../../middlewares";

const router: Router = Router();

router.post("/", authMiddleware, storeTodos);

export default router;
