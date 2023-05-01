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
    let result = await cartManager.getCartById(req.params.cid)
    res.render('cart',result)
})

router.post("/:cid/product/:pid", async(req,res)=>{
    res.send(await cartManager.addProductCart(req.params.cid,req.params.pid))
})

router.delete("/:cid",async(req,res)=>{
    res.send(await cartManager.deleteAllProducts(req.params.cid))
})

router.delete("/:cid/product/:pid",async(req,res)=>{
    res.send(await cartManager.deleteCartProduct(req.params.cid,req.params.pid))
})

router.put("/:cid",async(req,res)=>{
    res.send(await cartManager.updateCartProducts(req.params.cid,req.body))
})

router.put("/:cid/product/:pid",async(req,res)=>{
    const { cid, pid } = req.params;
    const { quantity } = req.body

    res.send(await cartManager.updateProductQty(cid,pid,quantity))
})

export default router