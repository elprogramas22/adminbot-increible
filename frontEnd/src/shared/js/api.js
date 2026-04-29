import { getUser, getToken } from "./storage.js"
const API_URL = "http://localhost:3000/api"

const user = getUser()
const token = getToken()

export async function request(endpoint, options = {}) {
    
    const headers = {
        "content-type": "application/json",
        ...options.headers
    }

    if (token) {
        headers["authorization"] = `Bearer ${token}`
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