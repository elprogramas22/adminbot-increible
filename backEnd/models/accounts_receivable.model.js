import db from "../config/db.js"

export const getAll = async () => {
    const [rows] = await db.query("SELECT * FROM accounts_receivable")
    return rows
};

export const create = async (data) => {
    const {id, student_id, charge_type_id, period, due_date, amount, outstanding_balance, status, created_at, updated_at} = data;
    await db.query("INSERT INTO accounts_receivable (id, student_id, charge_type_id, period, due_date, amount, outstanding_balance, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id, student_id, charge_type_id, period, due_date, amount, outstanding_balance, status, created_at, updated_at])
};