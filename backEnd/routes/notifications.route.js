import express from "express"
import {getNotifications, createNotification} from "../controllers/notification.controller.js"

const router = express.Router()

router.get("/notification", getNotifications)
router.post("/notification", createNotification)

export default router;