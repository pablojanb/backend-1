const socket = io()

const addToCartBtns = document.querySelectorAll(".add-to-cart-btn")
const link_cart = document.getElementById("link_cart")

let newCart = JSON.parse(localStorage.getItem('cart')) || null

if (!newCart) {
    socket.emit('createCart', 'msg')
} else {
    link_cart.innerHTML = `
                        <a href="http://localhost:8080/carts/${newCart._id}">Cart</a>
                        `
}

socket.on('cart', cart=>{
    newCart = cart
    localStorage.setItem('cart', JSON.stringify(newCart))
    link_cart.innerHTML = `
                        <a href="http://localhost:8080/carts/${newCart._id}">Cart</a>
                        `
})

addToCartBtns.forEach(btn=>{
    btn.addEventListener('click', async()=>{
        const prodId = btn.id
        socket.emit('add-to-cart', {prodId, newCart})
    })
})