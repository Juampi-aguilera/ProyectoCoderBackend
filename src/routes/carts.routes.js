import { Router } from "express";
import CartManager from "../service/CartManager.js";

const router = Router()
let cartManager = new CartManager("./files/carts.json")

router.post("/",async(req,res)=>{
    await cartManager.addCart(req.body);
    res.status(200).send({
        status: "Success",
        message: `The cart was successfully created!`,
    });
})

router.get("/:cid",async(req,res)=>{
    res.send(await cartManager.getCartById(req.params.cid))
})



export default router