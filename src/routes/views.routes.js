import express from 'express'
import ProductManager from '../services/ProductManager.js'
import CartManager from '../services/CartManager.js'

const router = express.Router()
const prodManag = new ProductManager()
const cartManag = new CartManager()

router.get('/', async(req, res)=>{
    const limit = parseInt(req.query.limit)
    const page = parseInt(req.query.page)
    const category = req.query.category
    const sort = parseInt(req.query.sort)
    const products = await prodManag.getProducts(limit, page, category, sort)
    let linkPrevPage
    if (products.hasPrevPage) {
        if (category !== undefined && (sort === 1 || sort === -1)) {
            linkPrevPage = `http://localhost:8080/?page=${products.prevPage}&limit=${limit}&category=${category}&sort=${sort}`
        } else if (category !== undefined) {
            linkPrevPage = `http://localhost:8080/?page=${products.prevPage}&limit=${limit}&category=${category}`
        } else if ((sort === 1 || sort === -1)) {
            linkPrevPage = `http://localhost:8080/?page=${products.prevPage}&limit=${limit}&sort=${sort}`
        } else {
            linkPrevPage = `http://localhost:8080/?page=${products.prevPage}&limit=${limit}`
        }
    } else {
        linkPrevPage = ''
    }
    let linkNextPage
    if (products.hasNextPage) {
        if (category !== undefined && (sort === 1 || sort === -1)) {
            linkNextPage = `http://localhost:8080/?page=${products.nextPage}&limit=${limit}&category=${category}&sort=${sort}`
        } else if (category !== undefined) {
            linkNextPage = `http://localhost:8080/?page=${products.nextPage}&limit=${limit}&category=${category}`
        } else if ((sort === 1 || sort === -1)) {
            linkNextPage = `http://localhost:8080/?page=${products.nextPage}&limit=${limit}&sort=${sort}`
        } else {
            linkNextPage = `http://localhost:8080/?page=${products.nextPage}&limit=${limit}`
        }
    } else {
        linkNextPage = ''
    }
    products.linkPrevPage = linkPrevPage
    products.linkNextPage = linkNextPage
    products.isValid = !(page <=0 || page > products.totalPages)
    res.render('home', {products, style: 'css/home.css'})
})

router.get('/carts/:cid', async(req, res)=>{
    const cartId = req.params.cid
    const cart = await cartManag.getCart(cartId)
    const products = cart.products
    const noEmpty = products.length > 0
    res.render('cart', {products, noEmpty, style: '/css/cart.css'})
})

router.get('/realtimeproducts', (req, res)=> {
    res.render('realTimeProducts', {style: 'css/real-time-products.css'})
})

export default router