let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cartCountElement = document.querySelector("#cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = cart.length;
  }
}

function renderCartItems() {
  const cartItemsElement = document.querySelector("#cart-items");
  if (!cartItemsElement) return;

  if (cart.length === 0) {
    cartItemsElement.innerHTML = `<tr><td colspan="3" class="text-center">Your cart is empty</td></tr>`;
  } else {
    cartItemsElement.innerHTML = cart
      .map(
        (item, index) =>
          `<tr>
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button></td>
          </tr>`
      )
      .join("");
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCartItems();
});

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = button.dataset.price;
    addToCart(name, price);
  });
});
