import {getAll, create, getById, getByEmail, update, remove} from "../models/users.model.js"
import {randomUUID} from "crypto"
import bcrypt from "bcrypt"

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
        const { first_name, last_name, email, password, phone, role } = req.body

        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({ message: "Required fields: first_name, last_name, email, password" })
        }

        // Hash password
        const password_hash = await bcrypt.hash(password, 10)

        const newUser = {
            id: randomUUID(),
            first_name,
            last_name,
            email,
            password_hash,
            phone: phone || null,
            role: role || 'user',
            is_active: true,
            created_at: new Date(),
            updated_at: new Date()
        }

        await create(newUser)
        res.status(201).json({ message: "User created successfully" })
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message })
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await getById(id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message })
    }
}

export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.query
        if (!email) {
            return res.status(400).json({ message: "Email parameter required" })
        }
        const user = await getByEmail(email)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { first_name, last_name, email, phone, role, is_active } = req.body

        const user = await getById(id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const updateData = {
            first_name: first_name || user.first_name,
            last_name: last_name || user.last_name,
            email: email || user.email,
            phone: phone !== undefined ? phone : user.phone,
            role: role || user.role,
            is_active: is_active !== undefined ? is_active : user.is_active,
            updated_at: new Date()
        }

        await update(id, updateData)
        res.status(200).json({ message: "User updated successfully" })
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await getById(id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        await remove(id)
        res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message })
    }
}