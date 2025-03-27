const groceryItems = [
    { id: 1, title: 'Apple', price: 30, image: 'img/apple.jpg' },
    { id: 2, title: 'Banana', price: 20, image: 'img/banana.jpg' },
    { id: 3, title: 'Carrot', price: 40, image: 'img/carrot.jpg' },
    { id: 4, title: 'onion', price: 80, image: 'img/onion.jpg' },
    { id: 5, title: 'potato', price: 50, image: 'img/potato.jpeg' },
    { id: 6, title: 'cabbage', price: 70, image: 'img/cabbage.jpg' },
    { id: 7, title: 'cauliflower', price: 60, image: 'img/cauliflower.jpg' },
    { id: 8, title: 'mango', price: 200, image: 'img/mango.jpg' },
    { id: 9, title: 'orange', price: 65, image: 'img/orange.jpg' },
    { id: 10, title: 'grapes', price: 90, image: 'img/grapes.jpg' }
];


let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const groceryContainer = document.getElementById("grocery-items");

function renderGroceryItems() {
    groceryItems.forEach(item => {
        groceryContainer.innerHTML += `
            <div class="col-md-4">
                <div class="card mb-4">
                    <img src="${item.image}" class="card-img-top" alt="${item.title}">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">Price: Rs. ${item.price}</p>
                        <button class="btn btn-primary" onclick="addToCart(${item.id})">
                            <i class="fa fa-shopping-cart"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>`;
    });
}

function addToCart(id) {
    const item = groceryItems.find(item => item.id === id);
    const cartItem = cartItems.find(item => item.id === id);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cartItems.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCartBadge();
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCart();
    updateCartBadge();
}

function updateQuantity(index, action) {
    if (action === 'increment') {
        cartItems[index].quantity += 1;
    } else if (action === 'decrement' && cartItems[index].quantity > 1) {
        cartItems[index].quantity -= 1;
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCart();
    updateCartBadge();
}

function updateCartBadge() {
    const cartBadge = document.querySelector('.cart-badge');
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
}

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
                    <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4>${item.title}</h4>
                        <p>Price: Rs. ${item.price}</p>
                        <p>
                            Quantity: 
                            <button class="btn btn-sm btn-primary" onclick="updateQuantity(${index}, 'decrement')">-</button>
                            <span>${item.quantity}</span>
                            <button class="btn btn-sm btn-primary" onclick="updateQuantity(${index}, 'increment')">+</button>
                        </p>
                        <p>Item Total: Rs. ${itemTotal}</p>
                        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button>
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
} else {
    renderGroceryItems();
    updateCartBadge();
}
