import { Router } from 'express'
import CartManager from '../services/CartManager.js'


const cartManag = new CartManager()

const router = Router()

router.post('/', async (req, res) => {
    try {
        const newCart = await cartManag.addCart()
        res.status(201).send(newCart)
    } catch(err) {
        console.log(`Error: ${err}`)
    }
})

router.get('/:cid', async (req, res) => {

    try {
        const cartId = req.params.cid
        const cart = await cartManag.getCart(cartId)
        
        res.send(cart)
    } catch (err) {
        res.status(404).send({ error: 'cart not found' })
    }
})

router.post('/:cid/product/:pid', async (req, res) => {

    try {
        const cartId = req.params.cid
        const prodId = req.params.pid

        const prodAdded = await cartManag.addProductToCart(prodId, cartId)

        res.status(201).send(prodAdded)
    } catch(err) {
        res.status(400).send({error: 'invalid data'})
    }

})

export default router