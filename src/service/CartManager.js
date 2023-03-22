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
        let cart = {
            products: []
        }

        if (this.carts.length > 0) {
            let ultimoId = this.carts[this.carts.length - 1].cartId
            cart.cartId = ultimoId + 1
        } else {
            cart.cartId = 1
        }
        this.carts.push(cart)

        await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
    }

    getCartById = async(cartId) => {
        let res = await this.read()
        if (res.find(item => item.cartId == cartId) === undefined) {
            console.error("Error: Cart not found")
            return "Error: Cart not found"
        } else {
            let cartById = res.find(item => item.cartId == cartId)
            console.log(cartById)
            return cartById
        }
    }

    addProduct= async(id)=>{
        
    }
    
}

export default CartManager