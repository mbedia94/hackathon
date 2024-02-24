import { Router } from "express";
import { changeStatusCompleted } from "../Controller/orderController";

const router = Router();

router.patch("/:orderId", changeStatusCompleted);

export default router;
