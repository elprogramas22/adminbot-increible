import db from "../config/db.js"

export const getdashboardData = async ()=>{
    const [students] = await db.query("SELECT COUNT(*) AS total FROM students")

    const [payments] = await db.query("SELECT COUNT(*) AS total FROM payments")
}