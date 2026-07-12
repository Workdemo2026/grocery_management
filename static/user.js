const api = "/api/products";

const productContainer = document.getElementById("productContainer");
const searchBox = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// =======================================
// Load Products
// =======================================

async function loadProducts() {

    try {

        const response = await fetch(api);

        const products = await response.json();

        displayProducts(products);

    }

    catch(error){

        console.log(error);

    }

}



// =======================================
// Display Products
// =======================================

function displayProducts(products){

    productContainer.innerHTML="";

    if(products.length===0){

        productContainer.innerHTML=

        `<h3>No Products Found</h3>`;

        return;

    }

    products.forEach(product=>{

        let status=

        product.quantity<5

        ?

        "<span class='low-stock'>Low Stock</span>"

        :

        "<span class='available'>Available</span>";



        const card=document.createElement("div");

        card.className="product-card";



        card.innerHTML=`


        <h3>${product.name}</h3>

        <p>${product.category}</p>

        <h4>$${Number(product.price).toFixed(2)}</h4>

        <p>${status}</p>



        <button class="cart-btn">

        Add To Cart

        </button>

        `;



        card.querySelector(".cart-btn")

        .addEventListener("click",()=>{

            addToCart(product);

        });



        productContainer.appendChild(card);

    });

}
// =======================================
// Add To Cart
// =======================================

function addToCart(product) {

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {

        existingProduct.cartQuantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            cartQuantity: 1

        });

    }

    saveCart();

    renderCart();

}



// =======================================
// Render Cart
// =======================================

function renderCart() {

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p>Your cart is empty.</p>

        `;

        cartTotal.textContent = "0.00";

        return;

    }

    cart.forEach(item => {

        total += item.price * item.cartQuantity;

        const row = document.createElement("div");

        row.className = "cart-item";

        row.innerHTML = `

            <div class="cart-details">

                <h4>${item.name}</h4>

                <p>$${Number(item.price).toFixed(2)}</p>

            </div>

            <div class="cart-controls">

                <button class="minus-btn">−</button>

                <span>${item.cartQuantity}</span>

                <button class="plus-btn">+</button>

                <button class="remove-btn">Remove</button>

            </div>

        `;

        row.querySelector(".plus-btn")
            .addEventListener("click", () => {

                increaseQuantity(item.id);

            });

        row.querySelector(".minus-btn")
            .addEventListener("click", () => {

                decreaseQuantity(item.id);

            });

        row.querySelector(".remove-btn")
            .addEventListener("click", () => {

                removeItem(item.id);

            });

        cartItems.appendChild(row);

    });

    cartTotal.textContent = total.toFixed(2);

}



// =======================================
// Increase Quantity
// =======================================

function increaseQuantity(id) {

    const item = cart.find(product => product.id === id);

    if (item) {

        item.cartQuantity++;

    }

    saveCart();

    renderCart();

}



// =======================================
// Decrease Quantity
// =======================================

function decreaseQuantity(id) {

    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.cartQuantity--;

    if (item.cartQuantity <= 0) {

        cart = cart.filter(product => product.id !== id);

    }

    saveCart();

    renderCart();

}



// =======================================
// Remove Item
// =======================================

function removeItem(id) {

    cart = cart.filter(product => product.id !== id);

    saveCart();

    renderCart();

}



// =======================================
// Save Cart
// =======================================

function saveCart() {

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

}
// =======================================
// Search Products
// =======================================

searchBox.addEventListener("keyup", async () => {

    const keyword = searchBox.value.trim();

    try {

        const response = await fetch(
            `/api/search?q=${encodeURIComponent(keyword)}`
        );

        const products = await response.json();

        filterCategory(products);

    }

    catch (error) {

        console.log(error);

    }

});



// =======================================
// Category Filter
// =======================================

categoryFilter.addEventListener("change", async () => {

    try {

        const response = await fetch(api);

        const products = await response.json();

        filterCategory(products);

    }

    catch (error) {

        console.log(error);

    }

});



function filterCategory(products) {

    const category = categoryFilter.value;

    if (category === "") {

        displayProducts(products);

        return;

    }

    const filteredProducts = products.filter(product =>
        product.category === category
    );

    displayProducts(filteredProducts);

}



// =======================================
// Checkout
// =======================================

checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    const total = cart.reduce((sum, item) => {

        return sum + (item.price * item.cartQuantity);

    }, 0);

    alert(
        `Order placed successfully!\n\nTotal Amount: $${total.toFixed(2)}`
    );

    cart = [];

    saveCart();

    renderCart();

});



// =======================================
// Load Products With Category
// =======================================

async function refreshProducts() {

    try {

        const response = await fetch(api);

        const products = await response.json();

        filterCategory(products);

    }

    catch (error) {

        console.log(error);

    }

}



// =======================================
// Refresh Every 15 Seconds
// =======================================

setInterval(() => {

    refreshProducts();

}, 15000);



// =======================================
// Initial Load
// =======================================

loadProducts();

renderCart();