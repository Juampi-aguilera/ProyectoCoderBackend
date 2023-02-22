class ProductManager {
    constructor() {
        this.products = []
    }

    addProduct(title, description, price, thumbnail, code, stock) {
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
            } else {
                console.error("Error: el producto ya se encuentra en la lista")
            }
        }
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        if (this.products.find(item => item.id == id) === undefined) {
            console.error("Error: Product not found")
        } else {
            this.products.find(item => item.id == id)
        }
    }
}