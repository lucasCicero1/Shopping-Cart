if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}


function ready() {

    let removeCartItemButtons = document.querySelectorAll('.btn')

    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    let quantityInputs = document.querySelectorAll('.cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    let addToCartButtons = document.querySelectorAll('.shop-item-button')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.querySelectorAll('.btn-purchase')[0].addEventListener('click', purchaseClicked)

}

function purchaseClicked(){
    alert('thank you for your purchase')
    let cartItems = document.querySelector('.cart-items')
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.querySelectorAll('.shop-item-title')[0].innerText
    let price = shopItem.querySelectorAll('.shop-item-price')[0].innerText
    let imageSrc = shopItem.querySelectorAll('.shop-item-image')[0].src

    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    let cartRow = document.createElement('div') 
    cartRow.classList.add('cart-row')
    let cartItems = document.querySelector('.cart-items')
    let cartItemNames = cartItems.querySelectorAll('.cart-item-title')
    for(let i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert('this item is already added to the cart')
            return
        }
    }
    cartRowContents = `
    <div class="cart-item">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price">${price}</span>
    <div class="cart-quantity">
     <input class="cart-quantity-input" type="number" value="1">
        <button class="btn" type="button">REMOVE</button>
    </div>
    `
    cartRow.innerHTML = cartRowContents
    cartItems.appendChild(cartRow)
    cartRow.querySelectorAll('.btn')[0].addEventListener('click', removeCartItem)
    cartRow.querySelectorAll('.cart-quantity-input')[0].addEventListener('change', quantityChanged)
}


function updateCartTotal() {
    let cartItemContainer = document.querySelector('.cart-items')
    let cartRows = cartItemContainer.querySelectorAll('.cart-row')
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.querySelectorAll('.cart-price')[0]
        let quantityElement = cartRow.querySelectorAll('.cart-quantity-input')[0]
        let price = parseFloat(priceElement.innerHTML.replace('R$', ''))
        let quantity = quantityElement.value
        total += (price * quantity)

    }
    total = Math.round(total * 100) / 100
    document.querySelector('.cart-total-price').innerText = `R$${total}`
}