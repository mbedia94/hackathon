import { Router } from "express";
import { getMenus } from "../Controller/MenusController";

const router = Router();

router.get("/", getMenus);

export default router;
