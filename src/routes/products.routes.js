import { Router } from 'express'
import fs from 'fs'
import __dirname from '../utils.js'
import { uploader } from '../utils.js'
import { getProducts } from '../utils.js'
import { generateId } from '../utils.js'

const router = Router()

router.get('/', async (req, res) => {
    const products = await getProducts()
    res.send(products)
})

router.get('/:pid', async (req, res) => {
    const products = await getProducts()
    const product = products.find(prod => prod.id === parseInt(req.params.pid))
    product && res.send(product)
    !product && res.status(404).send({ status: 'error', error: 'product not found' })
})

router.post('/', uploader.single('img'), async (req, res) => {
    const products = await getProducts()

    if (!req.body.title || !req.body.description || !req.body.code || !req.body.price || !req.body.status || !req.body.stock || !req.body.category || !req.file) {
        return res.status(400).send({ status: 'error', error: 'incomplete data' })
    }


    const product = { id: generateId(products), ...req.body, thumbnails: `${__dirname}/public/img/${req.file.filename}` }
    products.push(product)
    fs.promises.writeFile(`${__dirname}/products.json`, JSON.stringify(products, null, 2))
    res.send({ status: 'succesful', msg: 'product added' })

})

router.put('/:pid', uploader.single('img'), async (req, res) => {
    const products = await getProducts()


    const product = products.find(prod => prod.id === parseInt(req.params.pid))

    const productIndex = products.findIndex(prod => prod.id === parseInt(req.params.pid))

    if (productIndex < 0) {
        return res.status(404).send({ status: 'error', msg: 'product not found' })
    }

    if (req.file) {
        products[productIndex] = { id: parseInt(req.params.pid), ...product, ...req.body, thumbnails: `${__dirname}/public/img/${req.file.filename}` }
    } else {
        products[productIndex] = { id: parseInt(req.params.pid), ...product, ...req.body }
    }

    fs.promises.writeFile(`${__dirname}/products.json`, JSON.stringify(products, null, 2))

    res.send({ status: 'succesful', msg: 'product updated' })
})

router.delete('/:pid', async (req, res) => {
    const products = await getProducts()
    const neWproducts = products.filter(prod => prod.id !== parseInt(req.params.pid))

    if (products.length === neWproducts.length) {
        return res.status(404).send({ status: 'error', msg: 'user not found' })
    }

    fs.promises.writeFile(`${__dirname}/products.json`, JSON.stringify(neWproducts, null, 2))
    res.send({ status: 'succesful', msg: 'product deleted' })
})

export default router