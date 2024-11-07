import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import viewsRouter from './routes/views.routes.js'
import __dirname from './utils.js'
import ProductManager from './services/ProductManager.js'
import CartManager from './services/CartManager.js'
import mongoose from 'mongoose'

const app = express()
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', viewsRouter)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

const httpServer = app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})

const io = new Server(httpServer)

const prodManag = new ProductManager()
const cartManag = new CartManager()

io.on('connection', async (socket)=>{
    const products = await prodManag.getProducts()
    socket.emit('productsList', products)

    socket.on('deleting-product', async(id)=>{
        await prodManag.deleteProduct(id)
        const products = await prodManag.getProducts()
        socket.emit('productsList', products)
    })

    socket.on('new-product', async(product)=>{
        await prodManag.setProduct(product)
        const products = await prodManag.getProducts()
        socket.emit('productsList', products)
    })
    
    socket.on('add-to-cart', async(obj)=>{
        await cartManag.addProductToCart(obj.prodId, obj.newCart._id)
    })
    
    socket.on('createCart', async(msg)=>{
        const cart = await cartManag.addCart()
        socket.emit('cart', cart)
    })

})

const pathDB = 'mongodb://localhost:27017/music_store?retryWrites=true&w=majority'

const connectionDB = async()=>{
    try {
        await mongoose.connect(pathDB)
        console.log(`Connection to DB succesful`)
    } catch (error) {
        console.log(`Cannot connect to DB, error: ${error}`)
    }
}

connectionDB()