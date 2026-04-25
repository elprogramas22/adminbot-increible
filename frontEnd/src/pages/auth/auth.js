import {request} from "../../shared/js/api.js"
import { validMail, showError, cleanError } from "../../shared/js/utils.js"
import {saveUser} from "../../shared/js/storage.js"

const form = document.getElementById("login-form")
const email = document.getElementById("email")
const password = document.getElementById("password")
const error = document.getElementById("errorMessage")
const boton = document.getElementById("button-primary")

form.addEventListener("submit", async function (e) {
    e.preventDefault()
    cleanError()

    const emailValue = email.value.trim()
    const passwordValue = password.value.trim()

    if(!validMail(emailValue)){
        showError(error, "Correo electrónico inválido")
        return
    }

    if (passwordValue.length < 6) {
        showError(error, "La contraseña debe tener al menos 6 caracteres")
        return
    }

    try {
        boton.disabled = true
        boton.textContent = "Ingresando..."

        const response = await request("/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue
            })
        })

        if (response.ok) {
            saveUser(response.user, response.token)
            window.location.href = "/dashboard"
        }
    } catch (err) {
        showError(error, err.message || "Error al iniciar sesión")
    } finally {
        boton.disabled = false
        boton.textContent = "Ingresar al Sistema"
    }
})