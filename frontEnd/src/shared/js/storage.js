export function saveUser(user){
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("auth", true)
}

export function getUser(){
    return JSON.parse(localStorage.getItem("user"))
}

export function deleteUser(){
    localStorage.removeItem("user")
    localStorage.removeItem("auth")
}