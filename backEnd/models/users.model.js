import db from "../config/db.js"

export const getAll = async () => {
    const [rows] = await db.query("SELECT * FROM users")
    return rows
};

export const create = async (data) => {
    const {id, username, email, password_hash, role, status, created_at, updated_at} = data;
    await db.query("INSERT INTO users (id, username, email, password_hash, role, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [id, username, email, password_hash, role, status, created_at, updated_at])
};