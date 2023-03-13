import express from 'express'
import ProductManager from "./ProductManager.js";

let manager = new ProductManager("./src/products.json")
const app = express()
const PORT = 8080

app.listen(PORT, ()=>{
    console.log("server run on port "+ PORT);
})

app.use(express.urlencoded({ extended: true }))

app.get("/products",async(req,res)=>{
    let {limit} = req.query
    let arr = await manager.getProducts()
    if(limit){
        let filteredArr = arr.splice(0,limit)
        res.send(filteredArr)
    }else{
        res.send(arr)
    }    
})

app.get("/products/:pid",async(req,res)=>{
    res.send(await manager.getProductById(req.params.pid))
})



// manager.getProducts();
// manager.getProductById(1);
// manager.getProductById(3)
// manager.updateProduct(1,{title: "Banana"})
// manager.deleteProduct(2)