import fs from 'fs'

class CartManager {
    constructor(path) {
        this.carts = []
        this.path = path
    }

    read = async () => {
        let result = await fs.promises.readFile(this.path, "utf-8")
        let parsedRes = JSON.parse(result)
        return parsedRes
    }


    addCart = async () => {
        let carts= await this.read()

        let cart = {
            cartId: carts.length > 0 ? carts[carts.length - 1].cartId + 1 : 1,
            products: []
        }

        carts.push(cart)

        await fs.promises.writeFile(this.path, JSON.stringify(carts))

        this.carts=carts
    }

    getCartById = async(cartId) => {
        let res = await this.read()
        let cartById = res.find(item => item.cartId == cartId)
        if (cartById === undefined) {
            console.error("Error: Cart not found")
            return "Error: Cart not found"
        } else {
            console.log(cartById)
            return cartById
        }
    }

    addProductCart= async(cid,pid)=>{
        let res = await this.read()
        let cidInt = parseInt(cid)
        let cartExists = false
        let newArr = res.map((item) => {
            if(cidInt == item.cartId){
                cartExists = true
                let inCart = item.products.find(product => product.productId == pid)
                    if(inCart == undefined){
                        item.products.push({productId: pid, quantity:1})
                    }else{
                        inCart.quantity++
                    }
            }return item;
        })
        if (cartExists) {  
            await fs.promises.writeFile(this.path, JSON.stringify(newArr))
            console.log(newArr)
        } else {
            console.error(`Product ID ${cidInt} does not exist`)
        }
    }

    deleteAllProducts = async (cid)=>{
        let res = await this.read()
        let cidInt = parseInt(cid)
        let cartExists = false
        let newArr = res.map((item) => {
            if(cidInt == item.cartId){
                cartExists = true
                item.products=[]
            }return item;
        })
        if (cartExists) {  
            await fs.promises.writeFile(this.path, JSON.stringify(newArr))
            console.log(newArr)
        } else {
            console.error(`Product ID ${cidInt} does not exist`)
        }
    }

    deleteCartProduct = async (cid,pid) =>{
        let res = await this.read()
        let cidInt = parseInt(cid)
        let pidInt = parseInt(pid)
        let cartExists = false
        let newArr = res.map((item) => {
            if(cidInt == item.cartId){
                cartExists = true
                item.products=item.products.filter((product)=>product.productId != pidInt)
            }return item;
        })
        if (cartExists) {  
            await fs.promises.writeFile(this.path, JSON.stringify(newArr))
            console.log(newArr)
        } else {
            console.error(`Product ID ${cidInt} does not exist`)
        }
    }
    
    updateCartProducts = async (cid,arrayProducts)=>{
        let res = await this.read()
        let cidInt = parseInt(cid)
        let cartExists = false
        let newArr = res.map((item) => {
            if(cidInt == item.cartId){
                cartExists = true
                item.products=[...arrayProducts]
            }return item;
        })
        if (cartExists) {  
            await fs.promises.writeFile(this.path, JSON.stringify(newArr))
            console.log(newArr)
        } else {
            console.error(`Product ID ${cidInt} does not exist`)
        }
    }

    updateProductQty = async (cid,pid,qty)=>{
        let res = await this.read()
        let cidInt = parseInt(cid)
        let pidInt = parseInt(pid)
        let cartExists = false
        let newArr = res.map((item) => {
            if(cidInt == item.cartId){
                cartExists = true
                item.products.map((product)=>{
                    if(product.productId==pidInt){
                        product.quantity=qty
                    }
                })
            }return item;
        })
        if (cartExists) {  
            await fs.promises.writeFile(this.path, JSON.stringify(newArr))
            console.log(newArr)
        } else {
            console.error(`Product ID ${cidInt} does not exist`)
        }
    }
}

export default CartManager