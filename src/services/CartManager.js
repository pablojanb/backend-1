import cartsModel from '../models/carts.model.js'
import productsModel from '../models/products.model.js'

export default class CartManager {

    async addCart() {
        try {
            const newCart = {
                products: []
            }
            const cartCreated = await cartsModel.create(newCart)
            return cartCreated
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    async getCart(id) {
        try {
            const cart = await cartsModel.findOne({_id: id}).lean()
            return cart
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    async addProductToCart(prodId, cartId) {
        try {
            const cart = await cartsModel.findOne({_id: cartId})
            const product = await productsModel.findOne({_id: prodId})
            if (!cart || !product) {
                return undefined
            }
            const alreadyInCart = cart.products.findIndex(prod => prod.product.id === prodId)
            if (alreadyInCart < 0) {
                cart.products.push({product: prodId, quantity: 1})
            } else {
                cart.products[alreadyInCart].quantity += 1
            }
            await cartsModel.updateOne({_id: cartId},{products: cart.products})
            return { product: prodId, quantity: 1 }
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    async deleteProduct(prodId, cartId) {
        try {
            const cart = await cartsModel.findOne({_id: cartId})
            const product = await productsModel.findOne({_id: prodId})
            if (!cart || !product) {
                return undefined
            }
            const newCart = cart.products.filter(prod=>prod.product.id !== prodId)
            await cartsModel.updateOne({_id: cartId},{products: newCart})
            return product
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    async updateCart(updatedCart, cartId) {
        try {
            const cart = await cartsModel.findOne({_id: cartId})
            if (!cart) {
                return undefined
            }
            await cartsModel.updateOne({_id: cartId}, {products: updatedCart})
            return updatedCart
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    async updateQuantity(quantity, cartId, prodId) {
        try {
            const cart = await cartsModel.findOne({_id: cartId})
            const product = await productsModel.findOne({_id: prodId})
            if (!cart || !product || quantity < 1) {
                return undefined
            }
            const productToUpdate = cart.products.findIndex(prod=>prod.product.id === prodId)
            cart.products[productToUpdate].quantity = quantity
            await cartsModel.updateOne({_id: cartId},{products: cart.products})
            return { quantity }
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }
    
    async deleteProducts(cartId){
        try {
            await cartsModel.updateOne({_id: cartId},{products: []})
            return {products: []}
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }
}