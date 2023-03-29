import { Router } from "express";
import ProductManager from "../service/ProductManager.js";

const router = Router()
let manager = new ProductManager("./files/products.json")

router.get("/",async(req,res)=>{
    let {limit} = req.query
    let products = await manager.getProducts()
    if(limit){
        let filteredArr = products.splice(0,limit)
        res.send(filteredArr)
    }else{
        res.render('home',{
            title:"home",
            products
        })
        // res.send(products)
    }  
})

router.get("/:pid",async(req,res)=>{
    res.send(await manager.getProductById(req.params.pid))
})

router.post("/",async(req,res)=>{
    let {title,description,price,thumbnail,code,status,stock} = req.body 
    await manager.addProduct(title,description,price,thumbnail,code,status,stock)
    res.status(200).send({
        status: "Success",
        message: `Product ${code} was generated successfully!`
    });
})

router.put("/:pid",async(req,res)=>{
    let productUpdated = req.body
    await manager.updateProduct(req.params.pid,productUpdated)
    res.status(200).send({
        status: "Success",
        message: `Product ${productUpdated.code} was updated successfully!`
    });
})

router.delete("/:pid",async(req,res)=>{
    res.send(await manager.deleteProduct(req.params.pid))
})


export default router