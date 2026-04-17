import express from "express"
import bcrypt from "bcrypt"

import studentRoutes from "./routes/students.route.js" 
import guardianRoutes from "./routes/guardians.route.js"
import paymentRoutes from "./routes/payments.route.js"
import userRoutes from "./routes/users.route.js"
import notificatioRoutes from "./routes/notifications.route.js"
import authRoutes from "./routes/auth.route.js"

const PORT = process.env.PORT || 3000;

const app = express()
app.use(express.json())

app.use("/api", studentRoutes)
app.use("/api", guardianRoutes)
app.use("/api", paymentRoutes)
app.use("/api", userRoutes)
app.use("/api", notificatioRoutes)
app.use("/api", authRoutes)

app.get("/", (req, res)=>{
    res.send("api en funcionamiento")
})
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