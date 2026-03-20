import db from "../config/db.js"

export const getAll = async () => {
    const [rows] = await db.query("SELECT * FROM attendances")
    return rows
};

export const create = async (data) => {
    const {id, student_id, date, status, check_in_time, check_out_time, observation, registered_by_id, created_at, updated_at} = data;
    await db.query("INSERT INTO attendances (id, student_id, date, status, remarks, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)", [id, student_id, date, status, check_in_time, check_out_time, observation, registered_by_id, created_at, updated_at])
};