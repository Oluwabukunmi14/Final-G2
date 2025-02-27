document.addEventListener("DOMContentLoaded", function () {
  let cartCount = parseInt(localStorage.getItem("cartCount")) || 0; // Retrieve cart count from localStorage
  const cartIcon = document.querySelector(".fa-solid");

  // Set initial cart count in the icon
  cartIcon.innerText = cartCount;

  document.querySelectorAll(".submit").forEach((button) => {
    button.addEventListener("click", function () {
      cartCount++; // Increment cart count
      localStorage.setItem("cartCount", cartCount);
      cartIcon.innerText = cartCount;

      let name = this.getAttribute("data-name");
      let price = this.getAttribute("data-price");
      let image = this.getAttribute("data-image");

      addToCart(name, price, image);
    });
  });
});

// Function to add item to cart and save to localStorage
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart or create empty array

  // Check if item already exists, update quantity
  let existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart)); // Save to localStorage
  alert("Item added to cart!");
}

// Function to display cart items
function displayCart() {
  let cartItemsContainer = document.getElementById("cart-items");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalPrice = 0;

  cartItemsContainer.innerHTML = ""; // Clear previous items

  cart.forEach((item, index) => {
    totalPrice += item.price * item.quantity;

    cartItemsContainer.innerHTML += `
          <div class="product-card">
              <img src="${item.image}" alt="${item.name}">
              <h3>${item.name}</h3>
              <p>₦${item.price.toLocaleString()}</p>
              <p>Quantity: ${item.quantity}</p>
              <button onclick="removeFromCart(${index})">Remove</button>
          </div>
      `;
  });

  document.getElementById(
    "cart-total"
  ).innerText = `₦${totalPrice.toLocaleString()}`;
}

// Function to remove item from cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); // Remove item
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart(); // Refresh cart display
}

// Run displayCart() when cart page loads
if (window.location.pathname.includes("cart")) {
  displayCart();
}
