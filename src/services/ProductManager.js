import fs from 'fs/promises'
import path from 'path'
import { generateId } from '../utils.js'
import __dirname from '../utils.js'

const pathProductsFile = path.resolve('data', 'products.json')

export default class ProductManager {
    constructor(){
        this.products = []
        this.init()
    }

    async init() {
        try {
            const data = await fs.readFile(pathProductsFile, 'utf8')
            this.products = JSON.parse(data)
        } catch {
            this.products = []
        }
    }

    getProducts(limit) {
        if (limit) {
            return this.products.slice(0, limit)
        } else {
            return this.products
        }
    }

    getProduct(id) {
        return this.products.find(prod => prod.id === id)
    }

    setProduct(product, img) {
        const newProduct = {
            id: generateId(this.products),
            ...product,
            status: true,
        }

        if (img) {
            newProduct.thumbnails = [`${__dirname}/public/img/${img.filename}`]
        } else {
            newProduct.thumbnails = []
        }
        
        this.products.push(newProduct)

        this.setProductsFile()
        return newProduct

    }

    setProductsFile() {
        fs.writeFile(pathProductsFile, JSON.stringify(this.products, null, 2))
    }

    editProduct(id, modifiedProduct, img) {
        const product = this.products.find(prod => prod.id === id)

        const productIndex = this.products.findIndex(prod => prod.id === id)

        if (productIndex < 0) {
            return null
        }

        if (img) {
            this.products[productIndex] = {
                id: id,
                ...product,
                ...modifiedProduct
            }
            this.products[productIndex].thumbnails.push(`${__dirname}/public/img/${img.filename}`)
        } else {
            this.products[productIndex] = {
                id: id,
                ...product,
                ...modifiedProduct
            }
        }

        this.setProductsFile()
        return this.products[productIndex]
    }


    deleteProduct(id) {
        const deletedProd = this.products.filter(prod => prod.id === id)
        const newProducts = this.products.filter(prod => prod.id !== id)

        if (this.products.length === newProducts.length) {
            return null
        } else {
            this.products = newProducts
            this.setProductsFile()
            return deletedProd
        }
    }
}