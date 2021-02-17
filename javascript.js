if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded' , ready)
}
else{
    ready()
}

function ready(){

    const removeCartItem = document.getElementsByClassName('item-btn')
       for(let i = 0 ; i<removeCartItem.length ; i++){
           const RemoveButton = removeCartItem[i]
           RemoveButton.addEventListener('click' , removeItem)
    }

    const quantityInput = document.getElementsByClassName('item-input')
       for(let i = 0 ; i<quantityInput.length ; i++){
           const quantityChanged = quantityInput[i]
           quantityChanged.addEventListener('change' , changeQuantity)
    }

    const purchaseGuitar = document.getElementsByClassName('guitar-btn')
       for(let i = 0 ; i<purchaseGuitar.length ; i++){
           const buyButton = purchaseGuitar[i]
           buyButton.addEventListener('click' , purchasedGuitar)
       }
    
    const checkOut = document.getElementById('check-out')
    checkOut.addEventListener('click' , checkedOut)
}

function removeItem(event){
    let buttonClicked = event.target.parentElement
    buttonClicked.remove()
    updateResult()
}

function changeQuantity(event){
    let input = event.target
    if(isNaN(input.value) || input.value<=0){
        input.value = 1
    }
    updateResult()
}

function purchasedGuitar(event){
    const info = event.target.parentElement
    const brand = info.getElementsByClassName('guitar-title')[0].innerText
    const price = info.getElementsByClassName('guitar-price')[0].innerText
    const image = info.getElementsByClassName('guitar-img')[0].src
    addItem(brand , price , image)
}

function addItem(brand , price , image){
    let newItem = document.createElement('div')
    newItem.classList.add('item')
    
    const newItemContent = `
            <img class="item-img" src="${image}" alt="">
            <span class="item-title">${brand}</span>
            <span class="item-price">${price}</span>
            <input class="item-input" type="number" value="1">
            <button class="item-btn">Remove</button>
        `
    newItem.innerHTML = newItemContent
    const brands = document.getElementsByClassName('item-title')
    for( i = 0 ; i<brands.length ; i++){
        const guitarBrand = brands[i]

        if(guitarBrand.innerText === brand){
            alert('Item already in cart')
            return
        }
    }

    const itemContainer = document.getElementById('items-container')
    itemContainer.append(newItem)

    const quantityInput = document.getElementsByClassName('item-input')
    for(let i = 0 ; i<quantityInput.length ; i++){
        const quantityChanged = quantityInput[i]
        quantityChanged.addEventListener('change' , changeQuantity)
    }
    const removeCartItem = document.getElementsByClassName('item-btn')
       for(let i = 0 ; i<removeCartItem.length ; i++){
           const RemoveButton = removeCartItem[i]
           RemoveButton.addEventListener('click' , removeItem)
    }
    updateResult()
}

function updateResult(){
    let total = 0
    let result = document.getElementById('result')
    const items = document.getElementsByClassName('item')
    
    for(i = 0 ; i<items.length ; i++){
        const item = items[i]
        let quantity = item.getElementsByClassName('item-input')[0].value
        let price = item.getElementsByClassName('item-price')[0].innerText
        price = parseFloat(price.replace('$' , ''))
        total += (price * quantity)
    }
    result.innerText = `Total: $ ${total}`
}

function checkedOut(){
    const result = document.getElementById('result')
    const items = document.getElementsByClassName('items-container')[0]
    alert(`Thanks for buying! Purchase ${result.innerText}`)
    items.innerHTML = ''
    result.innerText = 'Total $ ' + 0
}
