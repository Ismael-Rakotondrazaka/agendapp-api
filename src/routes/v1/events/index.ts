import { Router } from "express";
import {
  storeEvents,
  showEvents,
  indexEvents,
  updateEvents,
  deleteEvents,
} from "../../../controllers";
import { authMiddleware, eventMiddleware } from "../../../middlewares";

const router: Router = Router();

router.post("/", authMiddleware, storeEvents);
router.get("/", authMiddleware, indexEvents);

router.get("/:eventId", authMiddleware, eventMiddleware, showEvents);
router.put("/:eventId", authMiddleware, eventMiddleware, updateEvents);
router.delete("/:eventId", authMiddleware, eventMiddleware, deleteEvents);

export default router;
