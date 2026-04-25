import db from "../config/db.js"

export const getDashboardData = async () => {
    const [students] = await db.query("SELECT COUNT(*) AS total FROM students")

    const [pendingPayments] = await db.query(`SELECT COUNT(*) AS total
        FROM accounts_receivable
        WHERE status = 'pending'`
    )

    const [absencesToday] = await db.query(`SELECT COUNT(*) AS total
        FROM attendance
        WHERE attendance_date = CURDATE()
        AND status = "absent"`
    )

    // Estudiantes que pagaron (status = 'paid')
    const [paidStudents] = await db.query(`
        SELECT s.first_name, s.last_name, ar.amount, ar.due_date
        FROM students s
        JOIN accounts_receivable ar ON s.id = ar.student_id
        WHERE ar.status = 'paid'
        ORDER BY ar.updated_at DESC
        LIMIT 10
    `)

    // Estudiantes pendientes (status = 'pending')
    const [pendingStudents] = await db.query(`
        SELECT s.first_name, s.last_name, ar.amount, ar.due_date
        FROM students s
        JOIN accounts_receivable ar ON s.id = ar.student_id
        WHERE ar.status = 'pending'
        ORDER BY ar.due_date ASC
        LIMIT 10
    `)

    // Estudiantes en mora (status = 'overdue' o due_date < CURDATE() y status != 'paid')
    const [overdueStudents] = await db.query(`
        SELECT s.first_name, s.last_name, ar.amount, ar.due_date
        FROM students s
        JOIN accounts_receivable ar ON s.id = ar.student_id
        WHERE ar.status = 'overdue' OR (ar.due_date < CURDATE() AND ar.status != 'paid')
        ORDER BY ar.due_date ASC
        LIMIT 10
    `)

    return{
        totalStudents: students[0].total,
        pendingPayments: pendingPayments[0].total,
        absencesToday: absencesToday[0].total,
        paidStudents,
        pendingStudents,
        overdueStudents
    }
};