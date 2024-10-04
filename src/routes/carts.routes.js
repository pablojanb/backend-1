import { Router } from 'express'
import fs from 'fs'
import { generateId } from '../utils.js'
import __dirname from '../utils.js'

const router = Router()

router.post('/', async (req, res) => {
    const carts = await fs.promises.readFile(`${__dirname}/carts.json`)
    const cartsObj = JSON.parse(carts)
    const newCart = {
        id: generateId(cartsObj),
        products: []
    }
    cartsObj.push(newCart)
    fs.promises.writeFile(`${__dirname}/carts.json`, JSON.stringify(cartsObj, null, 2))
    res.send({ status: 'succesful', msg: 'cart added' })
})

router.get('/:cid', async (req, res) => {
    const carts = await fs.promises.readFile(`${__dirname}/carts.json`)
    const cartsObj = JSON.parse(carts)
    const cart = cartsObj.find(cart => cart.id === parseInt(req.params.cid))
    cart && res.send(cart.products)
    !cart && res.status(404).send({ status: 'error', msg: 'cart not found' })
})

router.post('/:cid/product/:pid', async (req, res) => {

    const products = await fs.promises.readFile(`${__dirname}/products.json`)
    const productsObj = JSON.parse(products)
    const product = productsObj.find(prod => prod.id === parseInt(req.params.pid))

    if (!product) {
        return res.status(404).send({ status: 'error', msg: 'product not found' })
    }

    const carts = await fs.promises.readFile(`${__dirname}/carts.json`)
    const cartsObj = JSON.parse(carts)
    const cart = cartsObj.find(cart => cart.id === parseInt(req.params.cid))


    if (cart) {
        const alreadyInCart = cart.products.findIndex(prod => prod.id === parseInt(req.params.pid))

        if (alreadyInCart < 0) {
            cart.products.push({ id: parseInt(req.params.pid), quantity: 1 })
        } else {
            cart.products[alreadyInCart].quantity += 1
        }

        await fs.promises.writeFile(`${__dirname}/carts.json`, JSON.stringify(cartsObj, null, 2))
        res.send({ status: 'succesful', msg: 'product added to cart' })
    } else {
        res.status(404).send({ status: 'error', msg: 'cart not found' })
    }
})

export default router