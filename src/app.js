import express from 'express'
import productsRouter from "./routes/products.routes.js"

const app = express()
const PORT = 8080

app.listen(PORT, ()=>{
    console.log("server run on port "+ PORT);
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/products", productsRouter)


