import bcrypt from "bcrypt"
import { findUserByEmail } from "../models/auth.model.js"
import { generateToken } from "../config/auth.middleware.js"

export const login = async (req,res)=>{
    try{
        const {email, password} = req.body
        

        if(!email || !password){
            return res.status(400).json({
                ok: false,
                message: "not enough data"
            })
        }

        const user = await findUserByEmail(email)
        if(!user){
            return res.status(401).json({
                message: "user not found"
            })
        }

        const validPass = await bcrypt.compare(password, user.password_hash)
        if(!validPass){
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        return res.status(200).json({
            ok: true,
            message: "Login successful!",
            user:{
                id: user.id,
                name: user.first_name,
                email: user.email
            },
            token: generateToken(user)
        })

    }catch(err){
        return res.status(500).json({
            ok: false,
            message: "server error",
            error: err
        })
    }
}