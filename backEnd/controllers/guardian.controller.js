import {getAll, create} from "../models/guardians.model.js"
import {randomUUID} from "crypto"

export const getGuardians = async (req, res) => {
    try {
        const data = await getAll()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message: "Error fetching guardians", error})
    }
}

export const createGuardian = async (req, res) => {
    try {
        const newGuardian = { id: randomUUID(), ...req.body }
        await create(newGuardian)
        res.status(201).json({message: "Guardian created"})
    } catch (error) {
        res.status(500).json({message: "Error creating guardian", error})
    }
}