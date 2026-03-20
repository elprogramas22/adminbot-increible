import {getAll, create} from "../models/payments.model.js"
import {randomUUID} from "crypto"

export const getPayments = async (req, res) => {
    try {
        const data = await getAll()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message: "Error fetching payments", error})
    }
}

export const createPayment = async (req, res) => {
    try {
        const newPayment = { id: randomUUID(), ...req.body }
        await create(newPayment)
        res.status(201).json({message: "Payment created"})
    } catch (error) {
        res.status(500).json({message: "Error creating payment", error})
    }
}