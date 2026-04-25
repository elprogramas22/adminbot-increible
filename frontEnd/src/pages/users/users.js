import { request } from '../../shared/js/api.js'

let allUsers = []
let filteredUsers = []
let editingUser = null

document.addEventListener('DOMContentLoaded', () => {
    loadUsers()
    setupEventListeners()
})

function setupEventListeners() {
    // Botones principales
    document.getElementById('add-user-btn').addEventListener('click', () => openModal())
    document.getElementById('search-btn').addEventListener('click', applyFilters)
    document.getElementById('reset-btn').addEventListener('click', resetFilters)
    document.getElementById('search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') applyFilters()
    })

    // Filtros
    document.getElementById('role-filter').addEventListener('change', applyFilters)
    document.getElementById('status-filter').addEventListener('change', applyFilters)

    // Modal
    document.getElementById('user-form').addEventListener('submit', handleFormSubmit)
    document.querySelector('.close').addEventListener('click', closeModal)
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('user-modal')
        if (event.target === modal) closeModal()
    })
}

async function loadUsers() {
    showLoading(true)
    try {
        const response = await request('/user')
        allUsers = response
        filteredUsers = [...allUsers]
        renderUsersTable()
    } catch (error) {
        showErrorAlert(error.message)
    } finally {
        showLoading(false)
    }
}

function applyFilters() {
    const searchTerm = document.getElementById('search-input').value.trim().toLowerCase()
    const roleFilter = document.getElementById('role-filter').value
    const statusFilter = document.getElementById('status-filter').value

    filteredUsers = allUsers.filter(user => {
        // Filtro de búsqueda
        const matchesSearch = !searchTerm || 
            user.first_name.toLowerCase().includes(searchTerm) ||
            user.last_name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            (user.phone && user.phone.includes(searchTerm))

        // Filtro de rol
        const matchesRole = !roleFilter || user.role === roleFilter

        // Filtro de estado
        const matchesStatus = !statusFilter || 
            (statusFilter === 'active' && user.is_active) ||
            (statusFilter === 'inactive' && !user.is_active)

        return matchesSearch && matchesRole && matchesStatus
    })

    renderUsersTable()
}

function resetFilters() {
    document.getElementById('search-input').value = ''
    document.getElementById('role-filter').value = ''
    document.getElementById('status-filter').value = ''
    filteredUsers = [...allUsers]
    renderUsersTable()
}

function renderUsersTable() {
    const tableContainer = document.getElementById('users-table')
    
    if (filteredUsers.length === 0) {
        tableContainer.innerHTML = '<div style="text-align: center; padding: 40px; color: #999;"><p>No hay usuarios registrados.</p></div>'
        return
    }

    const table = `
        <table class="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${filteredUsers.map(user => `
                    <tr>
                        <td><strong>${user.first_name} ${user.last_name}</strong></td>
                        <td>${user.email}</td>
                        <td>${user.phone || 'N/A'}</td>
                        <td><span class="role-${user.role}">${user.role === 'admin' ? 'Administrador' : 'Usuario'}</span></td>
                        <td>
                            <span class="status-${user.is_active ? 'active' : 'inactive'}">
                                ${user.is_active ? '✓ Activo' : '✗ Inactivo'}
                            </span>
                        </td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn-edit" onclick="editUser('${user.id}')">Editar</button>
                                <button class="btn-delete" onclick="deleteUser('${user.id}')">Eliminar</button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `
    tableContainer.innerHTML = table
}

function openModal(user = null) {
    const modal = document.getElementById('user-modal')
    const form = document.getElementById('user-form')
    const title = document.getElementById('modal-title')
    const passwordGroup = document.getElementById('password-group')
    const submitBtn = document.getElementById('submit-btn')

    clearModalMessages()
    editingUser = user

    if (user) {
        title.textContent = 'Actualizar Usuario'
        document.getElementById('first_name').value = user.first_name
        document.getElementById('last_name').value = user.last_name
        document.getElementById('email').value = user.email
        document.getElementById('password').value = ''
        document.getElementById('phone').value = user.phone || ''
        document.getElementById('role').value = user.role
        document.getElementById('password').required = false
        passwordGroup.querySelector('label .required').style.display = 'none'
        submitBtn.textContent = 'Actualizar'
    } else {
        title.textContent = 'Registro de Usuario'
        form.reset()
        document.getElementById('role').value = ''
        document.getElementById('password').required = true
        passwordGroup.querySelector('label .required').style.display = 'inline'
        submitBtn.textContent = 'Registrar'
    }

    modal.style.display = 'block'
}

function closeModal() {
    document.getElementById('user-modal').style.display = 'none'
    document.getElementById('user-form').reset()
    editingUser = null
    clearModalMessages()
}

function clearModalMessages() {
    document.getElementById('modal-error').classList.add('hidden')
    document.getElementById('modal-success').classList.add('hidden')
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '')
}

function validateForm(formData, isEdit = false) {
    const errors = {}

    if (!formData.first_name.trim()) {
        errors.first_name = 'El nombre es requerido'
    }

    if (!formData.last_name.trim()) {
        errors.last_name = 'El apellido es requerido'
    }

    if (!formData.email.trim() || !isValidEmail(formData.email)) {
        errors.email = 'Email válido requerido'
    }

    if (!isEdit && !formData.password) {
        errors.password = 'La contraseña es requerida'
    } else if (formData.password && formData.password.length < 6) {
        errors.password = 'La contraseña debe tener al menos 6 caracteres'
    }

    if (!formData.role) {
        errors.role = 'Debes seleccionar un rol'
    }

    return errors
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function displayFormErrors(errors) {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '')
    Object.keys(errors).forEach(field => {
        const errorEl = document.getElementById(`${field}-error`)
        if (errorEl) {
            errorEl.textContent = errors[field]
        }
    })
}

async function handleFormSubmit(e) {
    e.preventDefault()
    clearModalMessages()

    const formData = {
        first_name: document.getElementById('first_name').value.trim(),
        last_name: document.getElementById('last_name').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value,
        phone: document.getElementById('phone').value.trim(),
        role: document.getElementById('role').value
    }

    // Validar formulario
    const errors = validateForm(formData, !!editingUser)
    if (Object.keys(errors).length > 0) {
        displayFormErrors(errors)
        return
    }

    showLoading(true)
    try {
        if (editingUser) {
            // Actualizar usuario
            const updateData = { ...formData }
            if (!updateData.password) delete updateData.password
            
            await request(`/user/${editingUser.id}`, {
                method: 'PUT',
                body: JSON.stringify(updateData)
            })
            showSuccess('Usuario actualizado satisfactoriamente')
        } else {
            // Crear usuario
            await request('/user', {
                method: 'POST',
                body: JSON.stringify(formData)
            })
            showSuccess('Usuario registrado satisfactoriamente')
        }

        setTimeout(() => {
            closeModal()
            loadUsers()
        }, 1500)
    } catch (error) {
        showErrorInModal(error.message)
    } finally {
        showLoading(false)
    }
}

// Funciones globales para los botones
window.editUser = (id) => {
    const user = filteredUsers.find(u => u.id === id) || allUsers.find(u => u.id === id)
    if (user) openModal(user)
}

window.deleteUser = async (id) => {
    const user = filteredUsers.find(u => u.id === id) || allUsers.find(u => u.id === id)
    if (!user) return

    const confirmed = confirm(`¿Eliminar a ${user.first_name} ${user.last_name}?`)
    if (!confirmed) return

    showLoading(true)
    try {
        await request(`/user/${id}`, { method: 'DELETE' })
        showErrorAlert(`Usuario \"${user.first_name} ${user.last_name}\" eliminado satisfactoriamente`)
        loadUsers()
    } catch (error) {
        showErrorAlert('Error eliminando usuario: ' + error.message)
    } finally {
        showLoading(false)
    }
}

// Funciones de UI
function showLoading(show) {
    const loading = document.getElementById('loading')
    if (show) {
        loading.classList.remove('hidden')
    } else {
        loading.classList.add('hidden')
    }
}

function showErrorAlert(message) {
    const alert = document.getElementById('modal-error')
    alert.textContent = message
    alert.classList.remove('hidden')
}

function showErrorInModal(message) {
    const errorDiv = document.getElementById('modal-error')
    errorDiv.textContent = message
    errorDiv.classList.remove('hidden')
}

function showSuccess(message) {
    const successDiv = document.getElementById('modal-success')
    successDiv.textContent = message
    successDiv.classList.remove('hidden')
}