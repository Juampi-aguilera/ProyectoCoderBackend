import { Router } from "express";
import CartManager from "../service/CartManager.js";

const router = Router()
let cartManager = new CartManager("./files/carts.json")

router.post("/",async(req,res)=>{
    await cartManager.addCart();
    res.status(200).send({
        status: "Success",
        message: `The cart was successfully created!`,
    });
})

router.get("/:cid",async(req,res)=>{
    res.send(await cartManager.getCartById(req.params.cid))
})

router.post("/:cid/product/:pid", async(req,res)=>{
    res.send(await cartManager.addProductCart(req.params.cid,req.params.pid))
})

router.delete("/:cid",async(req,res)=>{
    res.send(await cartManager.deleteAllProduts(req.params.cid))
})

export default router