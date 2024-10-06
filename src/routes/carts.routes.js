import { Router } from 'express'
import CartManager from '../services/CartManager.js'


const cartManag = new CartManager()

const router = Router()

router.post('/', async (req, res) => {
    try {
        const newCart = await cartManag.addCart()
        res.send(newCart)
    } catch(err) {
        console.log(`Error: ${err}`)
    }
})

router.get('/:cid', async (req, res) => {

    try {
        const cartId = parseInt(req.params.cid)
        const cart = await cartManag.getCart(cartId)
        
        cart && res.send(cart)
        !cart && res.status(404).send({ status: 'error', msg: 'cart not found' })
    } catch (err) {
        console.log(`Error: ${err}`)
    }
})

router.post('/:cid/product/:pid', async (req, res) => {

    try {
        const cartId = parseInt(req.params.cid)
        const prodId = parseInt(req.params.pid)

        const prodAdded = await cartManag.setProductInCart(prodId, cartId)

        prodAdded && res.send(prodAdded)
        !prodAdded && res.send({error: 'invalid data'})
    } catch(err) {
        console.log(`Error: ${err}`)
    }

})

export default router