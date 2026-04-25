import { request } from '../../shared/js/api.js';
import { deleteUser, getUser } from '../../shared/js/storage.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Setup navigation
    document.getElementById('logout-btn').addEventListener('click', logout);

    try {
        const response = await request('dashboard');
        if (response.ok) {
            const data = response.dashboard;

            // Actualizar estadísticas
            document.getElementById('totalStudents').textContent = data.totalStudents;
            document.getElementById('pendingPayments').textContent = data.pendingPayments;
            document.getElementById('absencesToday').textContent = data.absencesToday;

            // Llenar listas de estudiantes
            populateStudentList('paidStudentsList', data.paidStudents);
            populateStudentList('pendingStudentsList', data.pendingStudents);
            populateStudentList('overdueStudentsList', data.overdueStudents);
        } else {
            console.error('Error al cargar dashboard:', response.message);
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
});

function logout() {
    deleteUser();
    window.location.href = '/login';
}

function populateStudentList(listId, students) {
    const list = document.getElementById(listId);
    if (students.length === 0) {
        list.innerHTML = '<li>No hay estudiantes en esta categoría.</li>';
        return;
    }

    students.forEach(student => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="student-name">${student.first_name} ${student.last_name}</span>
            <span class="student-amount">$${student.amount}</span>
            <span class="student-due">Vence: ${new Date(student.due_date).toLocaleDateString()}</span>
        `;
        list.appendChild(li);
    });
}