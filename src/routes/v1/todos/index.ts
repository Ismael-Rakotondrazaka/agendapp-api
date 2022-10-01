import { Router } from "express";
import { storeTodos, indexTodos, updateTodos } from "../../../controllers";
import { authMiddleware, todoMiddleware } from "../../../middlewares";

const router: Router = Router();

router.post("/", authMiddleware, storeTodos);
router.get("/", authMiddleware, indexTodos);

router.put("/:todoId", authMiddleware, todoMiddleware, updateTodos);

export default router;
