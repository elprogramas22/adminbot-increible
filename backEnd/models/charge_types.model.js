import db from "../config/db.js"

export const getAll = async () => {
    const [rows] = await db.query("SELECT * FROM charge_types")
    return rows
};

export const create = async (data) => {
    const {id, name, description, is_active, created_at, updated_at} = data;
    await db.query("INSERT INTO charge_types (id, name, description, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)", [id, name, description, is_active, created_at, updated_at])
};