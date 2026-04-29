export function saveUser(user, token){
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("token", token)
    localStorage.setItem("auth", true)
}

export function getUser(){
    return JSON.parse(localStorage.getItem("user"))
}

export function getToken(){
    return localStorage.getItem("token")
}

export function deleteUser(){
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("auth")
}