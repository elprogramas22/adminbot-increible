import express from "express"
import {getPayments, createPayment} from "../controllers/payment.controller.js"

const router = express.Router()

router.get("/payment", getPayments)
router.post("/payment", createPayment)

export default router;