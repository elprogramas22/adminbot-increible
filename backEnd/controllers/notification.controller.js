import {getAll, create} from "../models/whatsapp_notifications.model.js"
import {randomUUID} from "crypto"

export const getNotifications = async (req, res) => {
    try {
        const data = await getAll()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message: "Error fetching notifications", error})
    }
}

export const createNotification = async (req, res) => {
    try {
        const newNotification = { id: randomUUID(), ...req.body }
        await create(newNotification)
        res.status(201).json({message: "Notification created"})
    } catch (error) {
        res.status(500).json({message: "Error creating notification", error})
    }
}