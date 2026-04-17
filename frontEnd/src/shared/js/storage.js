export function saveUser(){
    localStorage.setItem("user", JSON.stringify(user))
}

export function deleteUser(){
    return JSON.parse(localStorage.getItem("user"))
}

export function logOff(){
    localStorage.removeItem("user")
}