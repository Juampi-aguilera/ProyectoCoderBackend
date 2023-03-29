import { Router } from "express";
import ProductManager from "../service/ProductManager.js";

const router = Router()
let manager = new ProductManager("./files/products.json")

router.get("/",async(req,res)=>{
    let products = await manager.getProducts()
    res.render("realTimeProducts",{
        title:"real Time Products",
        products
    })
})

export default router