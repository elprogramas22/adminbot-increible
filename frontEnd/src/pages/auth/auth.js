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

    const email = email.value.trim()
    const password = password.value.trim()

    if(!validMail(mail)){
        showError(error, "invalid email")
        return
    }

    if (password.length < 6) {
        showError(error, "The password must be at least 6 characters long")
    }

    try{}
    catch{}
    finally{}
})