document.addEventListener("DOMContentLoaded", function () {
  displayCart();
});

// Function to display cart items
function displayCart() {
  let cartItemsContainer = document.getElementById("cart-items");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalPrice = 0;

  cartItemsContainer.innerHTML = ""; // Clear previous items

  cart.forEach((item, index) => {
    totalPrice += item.price * item.quantity;

    let productDiv = document.createElement("div");
    productDiv.classList.add("cart-item");

    productDiv.innerHTML = `
          <img src="${item.image}" alt="${item.name}" width="100">
          <p>${item.name}</p>
         <p>?${Number(item.price).toLocaleString()}</p>
          <p>Quantity: ${item.quantity}</p>
          <button class="remove-item" data-index="${index}">Remove</button>
      `;

    cartItemsContainer.appendChild(productDiv);
  });

  document.getElementById(
    "cart-total"
  ).innerText = `₦${totalPrice.toLocaleString()}`;

  // Update cart count in UI
  let cartCount = cart.length;
  localStorage.setItem("cartCount", cartCount);
  const cartIcon = document.querySelector(".fa-solid");
  if (cartIcon) cartIcon.innerText = cartCount;

  // Attach event listener to remove buttons
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", function () {
      let index = this.getAttribute("data-index");
      removeFromCart(index);
    });
  });
}

// Function to remove item from cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); // Remove item

  if (cart.length === 0) {
    localStorage.setItem("cartCount", 0); // Reset cart count
    localStorage.removeItem("cart"); // Clear cart from localStorage
  } else {
    localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
  }

  displayCart(); // Refresh cart display
}
