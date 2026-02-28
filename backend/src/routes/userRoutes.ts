import { Router } from "express";
import { synUser } from "../controllers/userController";
import { requireAuth } from "@clerk/express";

const router = Router();
//syncing user with clerk 
router.post("/sync", requireAuth(),synUser)
export default router;