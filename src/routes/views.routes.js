import express from 'express'
import ProductManager from '../services/ProductManager.js'

const router = express.Router()
const prodManag = new ProductManager()

router.get('/', async(req, res)=>{
    const limit = parseInt(req.query.limit)
    const page = parseInt(req.query.page)
    const price = parseInt(req.query.price)
    const category = req.query.category
    const sort = parseInt(req.query.sort)
    const products = await prodManag.getProducts(limit, page, category, sort)
    const linkPrevPage = products.hasPrevPage ? `http://localhost:8080/?page=${products.prevPage}&limit=${limit}` : ""
    const linkNextPage = products.hasNextPage ? `http://localhost:8080/?page=${products.nextPage}&limit=${limit}` : ""
    products.linkPrevPage = linkPrevPage
    products.linkNextPage = linkNextPage
    console.log(products)
    res.render('home', {products, style: 'css/home.css'})
})

router.get('/realtimeproducts', (req, res)=> {
    res.render('realTimeProducts', {style: 'css/real-time-products.css'})
})

export default router