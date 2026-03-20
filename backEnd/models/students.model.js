import db from "../config/db.js"

export const getAll = async () => {
    const [rows] = await db.query("SELECT * FROM students")
    return rows
};

export const create = async (data) => {
    const {id, student_code, first_name, last_name, document_type, document_number, birth_date, grade, school_year, status, created_at, updated_at} = data;

    const [result] = await db.query("INSERT INTO students (id, student_code, first_name, last_name, document_type, document_number, birth_date, grade, school_year, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id, student_code, first_name, last_name, document_type, document_number, birth_date, grade, school_year, status, created_at, updated_at])
};