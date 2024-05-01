export function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.querySelector("#cart-count");

    if (!cartCountElement) {
      return;
    }
    
      if (totalItems > 0) {
          cartCountElement.textContent = totalItems;
          cartCountElement.style.display = "inline";
      } else {
          cartCountElement.style.display = "none";
      }
  }