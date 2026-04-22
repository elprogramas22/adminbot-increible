import express from "express"
import {getAttendances, createAttendance} from "../controllers/attendance.controller.js"

const router = express.Router()

router.get("/attendance", getAttendances)
router.post("/attendance", createAttendance)

export default router;