const socket = io()

socket.on('productsList', products=>{
    const productsList = document.getElementById('productsList')
    let prods = ''
    products.forEach(prod => {
        prods += `<p>${prod.title}</p>`
    });
    productsList.innerHTML = prods
})