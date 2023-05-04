import express from 'express'
import productsRouter from "./routes/products.routes.js"
import cartsRouter from "./routes/carts.routes.js"
import realtimeproductsRouter from "./routes/realtimeproducts.routes.js"
import ProductManager from './service/ProductManager.js'
import __dirname from "./utils.js";
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import mongoose from 'mongoose'
import productsModel from './models/products.model.js'
import MongoStore from 'connect-mongo';
import session from 'express-session';
import usersRouter from "./routes/users.routes.js"
import sessionsRouter from './routes/sessions.routes.js'

let manager = new ProductManager("./files/products.json")
const app = express()
const PORT = process.env.PORT || 8080

const httpServer = app.listen(PORT, ()=>{
    console.log('server running on port: '+PORT);
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const mongoURL="mongodb+srv://admin:1234@cluster0.ttuc4ws.mongodb.net/products"

const connectMongoDB= async()=>{
    try{
        await mongoose.connect(mongoURL)
        console.log("Conectado con exito a MongoDB usando Moongose.");
        // let response=await productsModel.insertMany([{"title":"Kill Bill","description":"Cuadro de Kill Bill","category":"Cine y Series","price":6000,"thumbnail":["https://postercity.com.ar/wp-content/uploads/2019/09/kill-bill-510x765.jpg"],"code":1,"status":true,"stock":true},{"title":"Pulp Fiction","description":"Cuadro de Pulp Fiction","category":"Cine y Series","price":6000,"thumbnail":["https://postercity.com.ar/wp-content/uploads/2017/07/Pulpfiction-510x744.jpg"],"code":2,"status":true,"stock":true},{"title":"john lennon pop","description":"Cuadro de john lennon pop","category":"Musica","price":4000,"thumbnail":["https://postercity.com.ar/wp-content/uploads/2022/07/john-lennon-pop-510x680.jpg"],"code":3,"status":true,"stock":true}])
        // console.log(response)
        let products = await productsModel.paginate({}, {limit: 2, page: 1});
        console.log(products);

    }catch(error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
}
connectMongoDB()

app.use(session({
    store:MongoStore.create({
        mongoUrl:mongoURL,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 40
    }),
    secret:"encriptacion",
    resave: false,
    saveUninitialized: true
}))

// configuracion de hbs
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

// carpeta public
app.use(express.static( __dirname + "/public"))

app.use('/users',usersRouter);
app.use('/api/sessions',sessionsRouter);
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
