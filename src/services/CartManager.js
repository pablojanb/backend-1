import fs from 'fs/promises'
import path from 'path'
import { generateId } from '../utils.js'
import ProductManager from './ProductManager.js'


const prodManager = new ProductManager()
const pathCartsFile = path.resolve('data', 'carts.json')

export default class CartManager {
    constructor() {
        this.carts = []
        this.init()
    }

    async init() {
        try {
            const data = await fs.readFile(pathCartsFile, 'utf8')
            this.carts = JSON.parse(data)
        } catch (err) {
            this.carts = []
        }
    }

    addCart() {
        const newCart = {
            id: generateId(this.carts),
            products: []
        }
        this.carts.push(newCart)
        this.setCartsFile()
        return newCart
    }

    setCartsFile() {
        fs.writeFile(pathCartsFile, JSON.stringify(this.carts, null, 2))
    }

    getCart(id) {
        return this.carts.find(cart => cart.id === id)
    }

    setProductInCart(prodId, cartId) {

        const products = prodManager.getProducts()
        const product = products.find(prod => prod.id === prodId)
        const cart = this.carts.find(cart => cart.id === cartId)

        if (!cart || !product) {
            return null
        }

        const alreadyInCart = cart.products.findIndex(prod => prod.id === prodId)

        if (alreadyInCart < 0) {
            cart.products.push({ id: prodId, quantity: 1 })
        } else {
            cart.products[alreadyInCart].quantity += 1
        }
        this.setCartsFile()
        return { id: prodId, quantity: 1 }
    }
}