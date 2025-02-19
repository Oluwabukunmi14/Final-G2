let cart = 1
  
  const carts = document.querySelector('.fa-solid')
  
  const button = document.querySelectorAll('.submit').forEach(button =>{
    
   
    button.addEventListener('click',() =>{
      carts.innerHTML = cart++
  })
  
  })
  const productImage = document.querySelector('.prdt-ctn');
const addToCartButton = document.querySelector('.submit');

const cartItems = document.querySelector('#cart-items');

addToCartButton.addEventListener('click', () => {
  const clonedImage = productImage.cloneNode(true);
  clonedImage.classList.add('cart-item-image');
  
  // Append the cloned image to the cart items container
  cartItems.appendChild(clonedImage);
});
