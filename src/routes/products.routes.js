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

router.get("/:pid",async(req,res)=>{
    res.send(await manager.getProductById(req.params.pid))
})

router.post("/",async(req,res)=>{
    let product = req.body 
    await manager.addProduct(product)
    res.status(200).send({
        status: "Success",
        message: `Product ${product.code} was generated successfully!`
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