const socket = io()

const addToCartBtns = document.querySelectorAll(".add-to-cart-btn")
let newCart = JSON.parse(localStorage.getItem('cart')) || null

if (!newCart) {
    socket.emit('createCart', 'msg')
}

socket.on('cart', cart=>{
    newCart = cart
    localStorage.setItem('cart', JSON.stringify(newCart))
})

addToCartBtns.forEach(btn=>{
    btn.addEventListener('click', async()=>{
        const prodId = btn.id
        socket.emit('add-to-cart', {prodId, newCart})
    })
})