import fs from 'fs'

class ProductManager {
    constructor(path) {
        this.products = []
        this.path = path
    }

    read = async() =>{
        let result = await fs.promises.readFile(this.path,"utf-8")
        let parsedRes = JSON.parse(result)
        return parsedRes
    }
    
    addProduct = async (title, description, price, thumbnail, code, stock) => {
        // await fs.promises.mkdir(this.path, { recursive: true })
        let product = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }

        if (product.stock === undefined || product.price === undefined || product.title === undefined || product.description === undefined || product.thumbnail === undefined || product.code === undefined) {
            console.error("Error: Revise e ingrese los campos nuevamente")
        }else{
            if (this.products.find(item => item.code === product.code) === undefined) {
                if (this.products.length > 0) {
                    let ultimoId = this.products[this.products.length - 1].id
                    product.id = ultimoId + 1
                } else {
                    product.id = 1
                }
                this.products.push(product)
                
                await fs.promises.writeFile(this.path, JSON.stringify(this.products))
            } else {
                console.error("Error: The product is already in the list")
            }
        }
    }

    getProducts = async() => {
        let res = await this.read()
        console.log(res)
        return res
    }

    getProductById = async(code) => {
        let res = await this.read()
        if (res.find(item => item.code == code) === undefined) {
            console.error("Error: Product not found")
            return "Error: Product not found"
        } else {
            let productById = res.find(item => item.code == code)
            console.log(productById)
            return productById
        }
    }

    updateProduct = async(id, campo) => {
        let res = await this.read()
        if (await this.getProductById(id)) {
            let newArr = res.map((item) => {
                return (id == item.id ? { ...item, ...campo } : item)
            })
            await fs.promises.writeFile(this.path, JSON.stringify(newArr))
            console.log(newArr)
        } else {
            console.error(`Product ID ${id} does not exist`)
        }
    }

    deleteProduct = async(code) => {
        let res = await this.read()
        if (res.find(item => item.code == code) === undefined) {
            console.error("Error: Product not found")
            return "Error: Product not found"
        } else {
            let productById = res.find(item => item.code == code)
            let indice = res.indexOf(productById)
            res.splice(indice,1)
            await fs.promises.writeFile(this.path, JSON.stringify(res))
            console.log(res)
            return res
        }
    }
}

export default ProductManager;