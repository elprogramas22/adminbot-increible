import express from "express"
import { getDashboard} from "../controllers/dashboard.controller.js"
import { authenticateToken } from "../config/auth.middleware.js"

const router = express.Router()

router.get("/dashboard", authenticateToken, getDashboard)

export default router