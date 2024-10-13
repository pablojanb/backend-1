const socket = io()

socket.on('productsList', products=>{
    const productsList = document.getElementById('productsList')
    let prods = ''
    products.forEach(prod => {
        prods += `
                <div class="product">
                    <h3>${prod.title}</h3>
                    <p>${prod.description}</p>
                    <p>Code: ${prod.code}</p>
                    <p>Price: $${prod.price}</p>
                    <p>Stock: ${prod.stock}</p>
                    <p>Category: ${prod.category}</p>
                    <button class="btn-delete">Eliminar</button>
                </div>
                `
    });
    productsList.innerHTML = prods
})