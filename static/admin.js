const api = "/api/products";

const table = document.getElementById("productTable");

const saveBtn = document.getElementById("saveBtn");

const clearBtn = document.getElementById("clearBtn");

const searchBox = document.getElementById("search");



// =============================
// Load Dashboard Summary
// =============================

async function loadDashboard() {

    try {

        const response = await fetch("/api/dashboard");

        const data = await response.json();

        document.getElementById("totalProducts").textContent =
            data.total_products;

        document.getElementById("inventoryValue").textContent =
            "$" + Number(data.inventory_value).toFixed(2);

        document.getElementById("lowStock").textContent =
            data.low_stock;

    }

    catch (error) {

        console.log(error);

    }

}



// =============================
// Load Products
// =============================

async function loadProducts() {

    try {

        const response = await fetch(api);

        const products = await response.json();

        displayProducts(products);

    }

    catch (error) {

        console.log(error);

    }

}



// =============================
// Display Products
// =============================

function displayProducts(products) {

    table.innerHTML = "";

    if (products.length === 0) {

        table.innerHTML = `

        <tr>

            <td colspan="8">

                No Products Available

            </td>

        </tr>

        `;

        return;

    }

    products.forEach(product => {

        const status =
            product.quantity < 5
                ? "<span class='low-stock'>Low Stock</span>"
                : "<span class='available'>Available</span>";

        const row = document.createElement("tr");

        row.innerHTML = `

        <td>${product.id}</td>

        <td>${product.name}</td>

        <td>${product.category}</td>

        <td>$${Number(product.price).toFixed(2)}</td>

        <td>${product.quantity}</td>

        <td>${status}</td>

        <td>

            <button

                class="edit-btn">

                Edit

            </button>

            <button

                class="delete-btn">

                Delete

            </button>

        </td>

        `;

        row.querySelector(".edit-btn")
            .addEventListener("click", () => {

                editProduct(product);

            });

        row.querySelector(".delete-btn")
            .addEventListener("click", () => {

                deleteProduct(product.id);

            });

        table.appendChild(row);

    });

}
// =============================
// Save Product (Add / Update)
// =============================

saveBtn.addEventListener("click", async () => {

    const id = document.getElementById("productId").value;

    const product = {

        name: document.getElementById("name").value.trim(),

        category: document.getElementById("category").value,

        price: parseFloat(document.getElementById("price").value),

        quantity: parseInt(document.getElementById("quantity").value),

    };



    if (

        product.name === "" ||

        product.category === "" ||

        isNaN(product.price) ||

        isNaN(product.quantity)

    ) {

        alert("Please fill all fields.");

        return;

    }



    if (product.price <= 0) {

        alert("Price must be greater than zero.");

        return;

    }



    if (product.quantity < 0) {

        alert("Quantity cannot be negative.");

        return;

    }



    let url = api;

    let method = "POST";



    if (id !== "") {

        url = `${api}/${id}`;

        method = "PUT";

    }



    try {

        const response = await fetch(url, {

            method: method,

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(product)

        });



        const result = await response.json();



        alert(result.message || result.error);



        clearForm();

        loadProducts();

        loadDashboard();

    }

    catch (error) {

        console.log(error);

        alert("Something went wrong.");

    }

});



// =============================
// Edit Product
// =============================

function editProduct(product) {

    document.getElementById("productId").value = product.id;

    document.getElementById("name").value = product.name;

    document.getElementById("category").value = product.category;

    document.getElementById("price").value = product.price;

    document.getElementById("quantity").value = product.quantity;


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}



// =============================
// Delete Product
// =============================

async function deleteProduct(id) {

    const confirmDelete = confirm(

        "Are you sure you want to delete this product?"

    );



    if (!confirmDelete) {

        return;

    }



    try {

        const response = await fetch(

            `${api}/${id}`,

            {

                method: "DELETE"

            }

        );



        const result = await response.json();



        alert(result.message || result.error);



        loadProducts();

        loadDashboard();

    }

    catch (error) {

        console.log(error);

        alert("Unable to delete product.");

    }

}
// =============================
// Search Products
// =============================

searchBox.addEventListener("keyup", async () => {

    const keyword = searchBox.value.trim();

    try {

        const response = await fetch(

            `/api/search?q=${encodeURIComponent(keyword)}`

        );

        const products = await response.json();

        displayProducts(products);

    }

    catch (error) {

        console.log(error);

    }

});



// =============================
// Clear Form
// =============================

function clearForm() {

    document.getElementById("productId").value = "";

    document.getElementById("name").value = "";

    document.getElementById("category").selectedIndex = 0;

    document.getElementById("price").value = "";

    document.getElementById("quantity").value = "";

}



// =============================
// Clear Button
// =============================

clearBtn.addEventListener("click", () => {

    clearForm();

});



// =============================
// Press Enter To Save Product
// =============================

document.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        const activeElement = document.activeElement.tagName;

        if (

            activeElement === "INPUT" ||

            activeElement === "SELECT"

        ) {

            event.preventDefault();

            saveBtn.click();

        }

    }

});



// =============================
// Auto Refresh Dashboard
// =============================

setInterval(() => {

    loadDashboard();

}, 10000);



// =============================
// Initial Load
// =============================

loadDashboard();

loadProducts();