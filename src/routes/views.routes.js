import express from 'express'
import ProductManager from '../services/ProductManager.js'

const router = express.Router()
const prodManag = new ProductManager()

router.get('/', async(req, res)=>{
    const products = await prodManag.getProducts()
    res.render('home', {products, style: 'css/home.css'})
})

router.get('/realtimeproducts', (req, res)=> {
    res.render('realTimeProducts', {style: 'css/real-time-products.css'})
})

export default router