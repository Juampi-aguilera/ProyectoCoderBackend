import express from 'express'
import productsRouter from "./routes/products.routes.js"
import cartsRouter from "./routes/carts.routes.js"
import realtimeproductsRouter from "./routes/realtimeproducts.routes.js"
import ProductManager from './service/ProductManager.js'
import __dirname from "./utils.js";
import handlebars from "express-handlebars"
import { Server } from "socket.io";

let manager = new ProductManager("./files/products.json")
const app = express()
const PORT = process.env.PORT || 8080

const httpServer = app.listen(PORT, ()=>{
    console.log('server running on port: '+PORT);
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// configuracion de hbs
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

// carpeta public
app.use(express.static( __dirname + "/public"))

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/realtimeproducts", realtimeproductsRouter)

const socketServer = new Server(httpServer)

//abrimos la comunicacion
socketServer.on("connection", socket=>{
    console.log("Cliente conectado!");

    // escuchamos al cliente
    socket.on("product", data =>{
        let {title,description,price,thumbnail,code,stock} = data
        manager.addProduct(title,description,price,thumbnail,code,stock)
        
    })

    socket.on("deleteProduct", data => {
        console.log(data)
        manager.deleteProduct(data)
    })
})
