import { Router } from "express";
import { storeTodos, indexTodos } from "../../../controllers";
import { authMiddleware } from "../../../middlewares";

const router: Router = Router();

router.post("/", authMiddleware, storeTodos);
router.get("/", authMiddleware, indexTodos);

export default router;
