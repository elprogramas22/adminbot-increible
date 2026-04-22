import db from "../config/db.js"

export const getAll = async () => {
    const [rows] = await db.query("SELECT * FROM student_guardians")
    return rows
};

export const create = async (data) => {
    const {id, student_id, guardian_id, relationship, is_primary, is_payment_responsible, receives_notifications, created_at} = data;
    await db.query("INSERT INTO student_guardians (id, student_id, guardian_id, relationship, is_primary, is_payment_responsible, receives_notifications, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [id, student_id, guardian_id, relationship, is_primary, is_payment_responsible, receives_notifications, created_at])
};