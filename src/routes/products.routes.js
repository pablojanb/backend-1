import { Router } from 'express'
import { uploader } from '../utils.js'
import ProductManager from '../services/ProductManager.js'

const router = Router()

const prodManager = new ProductManager()

router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit)
        const page = parseInt(req.query.page)
        const price = parseInt(req.query.price)
        const category = req.query.category
        const products = await prodManager.getProducts(limit, page, price, category)
        res.send(products)
    } catch (err) {
        console.log(`Error ${err}`)
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const prodId = req.params.pid
        const product = await prodManager.getProduct(prodId)
        res.send(product)

    } catch (err) {
        res.status(404).send({error: 'product not found' })
        console.log(`Error ${err}`)
    }
})

router.post('/', uploader.single('img'), async (req, res) => {

    try {
        let { title, description, code, price, stock, category } = req.body

        const img = req.file

        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).send({error: 'incomplete data' })
        } else {
            price = parseInt(price)
            stock = parseInt(stock)

            const prodAdded = await prodManager.setProduct({ title, description, code, price, stock, category }, img)
            res.status(201).send(prodAdded)
        }
    } catch (err) {
        console.log(`Error: ${err}`)
    }

})

router.put('/:pid', uploader.single('img'), async (req, res) => {
    
    try {
        const productId = req.params.pid
        const img = req.file
        let modifiedProduct = req.body
        const newProduct = await prodManager.editProduct(productId, modifiedProduct, img)

        res.status(201).send(newProduct)
        
    } catch(err) {
        res.status(404).send({error: 'product not found'})
        console.log(`Error: ${err}`)
    }

})

router.delete('/:pid', async (req, res) => {

    try {
        const prodId = req.params.pid
        const deletedProd = await prodManager.deleteProduct(prodId)

        deletedProd && res.send(deletedProd)
    } catch(err) {
        res.status(404).send({error: `product not found`})
        console.log(`Error: ${err}`)
    }

})

export default router