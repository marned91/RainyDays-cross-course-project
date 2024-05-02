function generateCheckoutConfirmationContent () {
  const checkoutConfirmationMessage = document.querySelector("#checkout-message");

  const confirmationWrapper = document.createElement("div");
  confirmationWrapper.className = "confirmation-wrapper"; 


  const confirmationHeadline = document.createElement("h1");
  confirmationHeadline.textContent = "THANK YOU";

  const confirmationText = document.createElement ("p");
  confirmationText.textContent = "Your order is confirmed and in good hands. We're preparing it with care and will send you an email once it's on its way.";

  const confirmationTextEnd = document.createElement ("p");
  confirmationTextEnd.textContent = "We hope our jacket adds a touch of adventure! You can expect your new jacket within 1-3 business days.";

  confirmationWrapper.appendChild(confirmationHeadline);
  confirmationWrapper.appendChild(confirmationText);
  confirmationWrapper.appendChild(confirmationTextEnd);

  checkoutConfirmationMessage.appendChild(confirmationWrapper);
}

generateCheckoutConfirmationContent();