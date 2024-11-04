import cartsModel from '../models/carts.model.js'
import productsModel from '../models/products.model.js'

export default class CartManager {

    addCart() {
        const newCart = {
            products: []
        }
        cartsModel.create(newCart)
        return newCart
    }

    getCart(id) {
        return cartsModel.findOne({_id: id})
    }

    async addProductToCart(prodId, cartId) {
        const cart = await cartsModel.findOne({_id: cartId})
        const product = await productsModel.findOne({_id: prodId})

        if (!cart || !product) {
            return null
        }

        const alreadyInCart = cart.products.findIndex(prod => prod.product === prodId)

        if (alreadyInCart < 0) {
            cart.products.push({product: prodId, quantity: 1})
        } else {
            cart.products[alreadyInCart].quantity += 1
        }

        await cartsModel.updateOne({_id: cartId},{products: cart.products})

        return { product: prodId, quantity: 1 }
    }

    async deleteProduct(prodId, cartId) {
        const cart = await cartsModel.findOne({_id: cartId})
        const product = await productsModel.findOne({_id: prodId})

        if (!cart || !product) {
            return null
        }
        
        const newCart = cart.products.filter(prod=>prod.product !== prodId)
        await cartsModel.updateOne({_id: cartId},{products: newCart})
        return product
    }

    async updateCart(updatedCart, cartId) {
        const cart = await cartsModel.findOne({_id: cartId})
        if (!cart) {
            return null
        }

        await cartsModel.updateOne({_id: cartId}, {products: updatedCart})
        return updatedCart
    }

    async updateQuantity(quantity, cartId, prodId) {
        const cart = await cartsModel.findOne({_id: cartId})
        const product = await productsModel.findOne({_id: prodId})

        if (!cart || !product || quantity < 0) {
            return null
        }
    
        const productToUpdate = cart.products.findIndex(prod=>prod.product === prodId)

        cart.products[productToUpdate].quantity = quantity

        await cartsModel.updateOne({_id: cartId},{products: cart.products})

        return quantity
    }
    
    async deleteProducts(cartId){
        await cartsModel.updateOne({_id: cartId},{products: []})
        return {products: []}
    }
}