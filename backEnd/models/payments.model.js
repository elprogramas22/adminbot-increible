import db from "../config/db.js"

export const getAll = async () => {
    const [rows] = await db.query("SELECT * FROM payments")
    return rows
};

export const create = async (data) => {
    const {id, account_receivable_id, payment_date, amount_paid, payment_method, reference, created_at} = data;
    await db.query("INSERT INTO payments (id, student_id, amount, payment_date, method, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [id, student_id, amount, payment_date, method, status, created_at])
};