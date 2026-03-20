import express from "express"

import studentRoutes from "./routes/students.route.js" 
import guardianRoutes from "./routes/guardians.route.js"
import paymentRoutes from "./routes/payments.route.js"
import userRoutes from "./routes/users.route.js"
import notificatioRoutes from "./routes/notifications.route.js"

const PORT = process.env.PORT || 3000;

const app = express()
app.use(express.json())

app.use("/api", studentRoutes)
app.use("/api", guardianRoutes)
app.use("/api", paymentRoutes)
app.use("/api", userRoutes)
app.use("/api", notificatioRoutes)

app.get("/", (req, res)=>{
    res.send("api en funcionamiento")
})

app.listen(PORT, ()=>{
    console.log("servidor corriendo en el puerto 3000")
})