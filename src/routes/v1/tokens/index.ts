import { Router } from "express";
import { refreshTokens } from "../../../controllers";

const router: Router = Router();

router.post("/refresh", refreshTokens);

export default router;
