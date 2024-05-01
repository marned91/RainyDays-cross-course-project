export function alertUser(errorMessage) {
  const errorParagraph = document.createElement("p");
  errorParagraph.textContent = errorMessage;

  alert(errorMessage);
}