import { getUser } from "./storage.js"
const API_URL = "http://localhost:3000/api"

const user = getUser()

export async function request(endpoint, options = {}) {
    
    const headers = {
        "content-type": "application/json",
        "x-auth": user? JSON.stringify(user): "",
        ...options.headers
    }
    const response = await fetch(API_URL + endpoint, {
        headers,
        ...options
    })

    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message || "Server error")
    }
    return data
}