import {getAll, create} from "../models/users.model.js"
import {randomUUID} from "crypto"

export const getUsers = async (req, res) => {
    try {
        const data = await getAll()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message: "Error fetching users", error})
    }
}

export const createUser = async (req, res) => {
    try {
        const newUser = { id: randomUUID(), ...req.body }
        await create(newUser)
        res.status(201).json({message: "User created"})
    } catch (error) {
        res.status(500).json({message: "Error creating user", error})
    }
}