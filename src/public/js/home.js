

const addToCartBtns = document.querySelectorAll(".add-to-cart-btn")

addToCartBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        //TO DO logic for adding product to cart
        alert(btn.id)
    })
})