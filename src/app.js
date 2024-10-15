import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import viewsRouter from './routes/views.routes.js'
import __dirname from './utils.js'
import ProductManager from './services/ProductManager.js'

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

io.on('connection', async (socket)=>{
    const products = await prodManag.getProducts()
    socket.emit('productsList', products)

    socket.on('deleting-product', id=>{
        prodManag.deleteProduct(id)
    })

    socket.on('new-product', product=>{
        prodManag.setProduct(product)
    })
})