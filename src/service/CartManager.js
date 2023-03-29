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
        if (await this.getCartById(cid)) {
            let newArr = res.map((item) => {
                if(cid == item.cartId){
                    let inCart = item.products.find(product => product.id == pid)
                        if(inCart == undefined){
                            item.cartId=cid
                            item.products=[...item.products,{productId: pid, quantity:1}]
                        }else{
                            item.cartId=cid
                            item.products=[...item.products,{productId: pid, quantity:item.products.quantity++}]
                        }
                }else{
                    item
                }
            })
            await fs.promises.writeFile(this.path, JSON.stringify(newArr))
            console.log(newArr)
        } else {
            console.error(`Product ID ${id} does not exist`)
        }
    }
    
}

export default CartManager