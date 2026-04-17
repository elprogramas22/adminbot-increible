const API_URL = "http://localhost3000/api"

export async function request(endpoint, options = {}) {
    const response = await fetch(API_URL+endpoint, {
        headers:{
            "content-type" : "application/json"
        },
        ...options
    })

    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message) || "error del server"
    }
    return data
}