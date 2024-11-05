

const addToCartBtns = document.querySelectorAll(".add-to-cart-btn")

addToCartBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        alert(btn.id)
    })
})