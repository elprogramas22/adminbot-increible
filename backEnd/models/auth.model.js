import db from "../config/db.js"

export const findUserByEmail = async (email)=>{
    const [rows] = await db.query("SELECT id, first_name, last_name, email, password_hash FROM users WHERE email = ?", [email])

    return rows[0]
}