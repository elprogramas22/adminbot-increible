import express from "express"
import bcrypt from "bcrypt"
import cors from "cors"

import studentRoutes from "./routes/students.route.js" 
import guardianRoutes from "./routes/guardians.route.js"
import paymentRoutes from "./routes/payments.route.js"
import userRoutes from "./routes/users.route.js"
import whatsappNotificationsRoutes from "./routes/whatsapp_notifications.route.js"
import authRoutes from "./routes/auth.route.js"
import dashboardRoute from "./routes/dashboard.route.js"
import attendanceRoutes from "./routes/attendance.route.js"
import { authenticateToken } from "./config/auth.middleware.js"


const app = express()
app.use(cors())
app.use(express.json())
const PORT = 3000

app.use("/api", studentRoutes)
app.use("/api", guardianRoutes)
app.use("/api", paymentRoutes)
app.use("/api", userRoutes)
app.use("/api", whatsappNotificationsRoutes)
app.use("/api", authRoutes)
app.use("/api", dashboardRoute)
app.use("/api", attendanceRoutes)

app.get("/", (req, res)=>{
    res.send("api en funcionamiento")
})

// Middleware para rutas API no encontradas (debe ir al final)
app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
        return res.status(404).json({
            ok: false,
            message: "Endpoint not found"
        })
    }
    next()
})

// Middleware para rutas privadas (debe ir después de las rutas)
app.use("/api/students", authenticateToken)
app.use("/api/guardians", authenticateToken)
app.use("/api/payments", authenticateToken)
app.use("/api/users", authenticateToken)
app.use("/api/whatsapp", authenticateToken)
app.use("/api/dashboard", authenticateToken)
app.use("/api/attendance", authenticateToken)
/*
const passwordList = [
    "andres123",
    "juan123",
    "esteban123",
    "emanuel123"
]

for(let i=0; i < passwordList.length; i++){
    const hash = await bcrypt.hash(passwordList[i], 10)
    console.log(`contrasenia : ${passwordList[i]}, hash : ${hash}`)
}
*/
app.listen(PORT, ()=>{
    console.log("servidor corriendo en el puerto 3000")
})