import { Router } from "express";
import ProductManager from "../service/ProductManager.js";
import productsModel from "../models/products.model.js";

const router = Router()
let manager = new ProductManager("./files/products.json")

router.get("/",async(req,res)=>{
    let products = await manager.getProducts()
    // res.render("realTimeProducts",{
    //     title:"real Time Products",
    //     products
    // })
    let page = parseInt(req.query.page);
    if(!page) page=1;

    let result = await productsModel.paginate({},{page,limit:2,lean:true})
    result.prevLink = result.hasPrevPage?`http://localhost:8080/api/realTimeProducts?page=${result.prevPage}`:'';
    result.nextLink = result.hasNextPage?`http://localhost:8080/api/realTimeProducts?page=${result.nextPage}`:'';
    result.isValid= !(page<=0||page>result.totalPages)
    res.render('realTimeProducts',result)
})

export default router