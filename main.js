let cart = 1
  
  const carts = document.querySelector('.fa-solid')
  
  const button = document.querySelectorAll('.submit').forEach(button =>{
    
   
    button.addEventListener('click',() =>{
      carts.innerHTML = cart++
  })
  
  })
