import bcrypt from "bcrypt"

import { findUserByEmail } from "../models/auth.model.js"

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

        const validPass = bcrypt.compare(password, user.password_hash)
        if(!validPass){
            return res.status(401).json({
                message: "password incorrect"
            })
        }

        return res.status(200).json({
            ok: true,
            message: "succes!",
            user:{
                id: user.id,
                name: user.first_name,
                email: user.email
            }
        })

    }catch(err){
        return res.status(500).json({
            ok: false,
            message: "server error",
            error: err
        })
    }
}