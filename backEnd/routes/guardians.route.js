import express from "express"
import {getGuardians, createGuardian} from "../controllers/guardian.controller.js"

const router = express.Router()

router.get("/guardian", getGuardians)
router.post("/guardian", createGuardian)

export default router;