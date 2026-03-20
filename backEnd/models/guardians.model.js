import db from "../config/db.js"

export const getAll = async () => {
    const [rows] = await db.query("SELECT * FROM guardians")
    return rows
};

export const create = async (data) => {
    const {id, first_name, last_name, phone, email, adress, whatsapp_active, created_at, updated_at} = data;
    await db.query("INSERT INTO guardians (id, first_name, last_name, relationship, phone, email, student_id, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id, first_name, last_name, phone, email, adress, whatsapp_active, created_at, updated_at])
};