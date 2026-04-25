import express from "express"
import {getUsers, createUser, getUserById, getUserByEmail, updateUser, deleteUser} from "../controllers/user.controller.js"

const router = express.Router()

router.get("/user", getUsers)
router.get("/user/search", getUserByEmail)
router.get("/user/:id", getUserById)
router.post("/user", createUser)
router.put("/user/:id", updateUser)
router.delete("/user/:id", deleteUser)

export default router;