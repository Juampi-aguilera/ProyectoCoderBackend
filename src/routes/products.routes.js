import { Router } from "express";
import ProductManager from "../service/ProductManager.js";

const router = Router()
let manager = new ProductManager("./files/products.json")

router.get("/",async(req,res)=>{
    let {limit} = req.query
    let arr = await manager.getProducts()
    if(limit){
        let filteredArr = arr.splice(0,limit)
        res.send(filteredArr)
    }else{
        res.send(arr)
    }    
})

router.get("/products/:pid",async(req,res)=>{
    res.send(await manager.getProductById(req.params.pid))
})

export default router