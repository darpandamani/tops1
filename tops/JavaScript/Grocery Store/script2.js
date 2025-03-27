const cartContainer = document.getElementById("cart-container");
const totalContainer = document.getElementById("total-container");

function renderCart() {
    cartContainer.innerHTML = "";
    let total = 0;

    if (cartItems.length > 0) {
        cartItems.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            cartContainer.innerHTML += `
                <div class="cart-item" data-index="${index}">
                    <img src="${item.img}" alt="${item.title}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4>${item.title}</h4>
                        <p>Price: Rs. ${item.price}</p>
                        <p>Quantity: ${item.quantity}</p>
                        <p>Item Total: Rs. ${itemTotal}</p>
                    </div>
                </div>`;
        });

        totalContainer.innerHTML = `<h3>Total Bill: Rs. ${total}</h3>`;
    } else {
        cartContainer.innerHTML = `<p>Your cart is empty.</p>`;
        totalContainer.innerHTML = "";
    }
}

if (window.location.pathname.endsWith('cart.html')) {
    renderCart();
}
