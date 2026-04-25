import db from "../config/db.js"

export const getAll = async () => {
    const [rows] = await db.query("SELECT * FROM users")
    return rows
};

export const create = async (data) => {
    const {id, first_name, last_name, email, password_hash, phone, role, is_active, created_at, updated_at} = data;
    await db.query("INSERT INTO users (id, first_name, last_name, email, password_hash, phone, role, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id, first_name, last_name, email, password_hash, phone, role, is_active, created_at, updated_at])
};

export const getById = async (id) => {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id])
    return rows[0]
};

export const getByEmail = async (email) => {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email])
    return rows[0]
};

export const update = async (id, data) => {
    const {first_name, last_name, email, phone, role, is_active, updated_at} = data;
    await db.query("UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, role = ?, is_active = ?, updated_at = ? WHERE id = ?", [first_name, last_name, email, phone, role, is_active, updated_at, id])
};

export const remove = async (id) => {
    await db.query("DELETE FROM users WHERE id = ?", [id])
};