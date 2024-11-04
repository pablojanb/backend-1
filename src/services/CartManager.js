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
}