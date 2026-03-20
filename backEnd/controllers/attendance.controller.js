import {getAll, create} from "../models/attendances.model.js"
import {randomUUID} from "crypto"

export const getAttendances = async (req, res) => {
    try {
        const data = await getAll()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message: "Error fetching attendances", error})
    }
}

export const createAttendance = async (req, res) => {
    try {
        const newAttendance = { id: randomUUID(), ...req.body }
        await create(newAttendance)
        res.status(201).json({message: "Attendance created"})
    } catch (error) {
        res.status(500).json({message: "Error creating attendance", error})
    }
}