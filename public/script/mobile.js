const mobileMenuButtonElement = document.getElementById(".mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

function toggleMobileMenu() {
  //mobileMenuButtonElement.style.display = "block";
  mobileMenuButtonElement.classList.toggle("open");
}

mobileMenuButtonElement.addEventListener("click", toggleMobileMenu);
