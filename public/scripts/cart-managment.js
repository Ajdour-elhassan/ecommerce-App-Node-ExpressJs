const addItemToCartButtonElement = document.querySelector(
  "#product-details button"
);

const cartBadgeElemnt = document.querySelector(".nav-items .badge");

async function addToCart() {
  const productId = addItemToCartButtonElement.dataset.productid;
  const csrfToken = addItemToCartButtonElement.dataset.csrf;

  let response;

  try {
    response = await fetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
        _csrf: csrfToken,
      }),
      header: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("Something went wrong!");
    return;
  }

  if (!response.ok) {
    alert("Someting went wrong!");
    return;
  }

  // Get DATA FROM control response
  const responseData = await response.json();

  // Get newTotalQauntity from cart Control
  const newTotalQuntity = responseData.newTotalItems;

  // Update badge ...  newTotalQauntity
  cartBadgeElemnt.textContent = newTotalQuntity;
}

addItemToCartButtonElement.addEventListener("click", addToCart);
