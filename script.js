/* ================================
MEDEASE PHARMACY WEBSITE
JAVASCRIPT
================================ */

/* ================================
CART
================================ */

let cartCount = 0;

const addButtons = document.querySelectorAll(".add-cart");
const cartCountElement = document.getElementById("cartCount");
const cartButton = document.getElementById("cartBtn");

addButtons.forEach(function (button) {

button.addEventListener("click", function () {

    cartCount++;

    // Update cart count
    cartCountElement.innerText = cartCount;

    // Button feedback
    button.innerText = "Added ✓";

    setTimeout(function () {

        button.innerText = "Add +";

    }, 1200);

});

});

/* ================================
CART BUTTON
================================ */

cartButton.addEventListener("click", function () {

    if (cartCount === 0) {

        alert("Your cart is empty.");

    } else {

        window.location.href = "cart.html";

    }

});

/* ================================
SEARCH
================================ */

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchBtn");
const searchMessage = document.getElementById("searchMessage");

function performSearch() {

const searchValue = searchInput.value.trim().toLowerCase();

const products = document.querySelectorAll(".product-card");

if (searchValue === "") {

    searchMessage.innerText =
        "Please enter a medicine or product name.";

    return;
}

let found = false;

products.forEach(function (product) {

    const productName =
        product.dataset.name.toLowerCase();

    if (productName.includes(searchValue)) {

        product.style.display = "block";

        found = true;

    } else {

        product.style.display = "none";

    }

});


document.querySelector("#medicines").scrollIntoView({
    behavior: "smooth"
});


if (found) {

    searchMessage.innerText =
        "✓ Product found!";

} else {

    searchMessage.innerText =
        "No matching product found.";

}

}

searchButton.addEventListener("click", performSearch);

searchInput.addEventListener("keypress", function (event) {

if (event.key === "Enter") {

    performSearch();

}

});

/* ================================
ORDER MEDICINES
================================ */

const orderButton =
document.getElementById("orderMedicinesBtn");

orderButton.addEventListener("click", function () {

document.querySelector("#medicines").scrollIntoView({
    behavior: "smooth"
});

});

/* ================================
BROWSE CATEGORIES
================================ */

const browseButton =
document.getElementById("browseCategoriesBtn");

browseButton.addEventListener("click", function () {

document.querySelector("#categories").scrollIntoView({
    behavior: "smooth"
});

});

/* ================================
LOGIN
================================ */

const loginButton =
document.getElementById("loginBtn");

loginButton.addEventListener("click", function () {

alert(
    "🔐 Login feature will be available soon!"
);

});

/* ================================
CATEGORY CARDS
================================ */

const categoryCards =
document.querySelectorAll(".category-card");

categoryCards.forEach(function (card) {

card.addEventListener("click", function () {

    const categoryName =
        card.querySelector("h3").innerText;

    searchInput.value = categoryName;

    document.querySelector(".search-section")
        .scrollIntoView({
            behavior: "smooth"
        });

});

});

/* ================================
PRESCRIPTION UPLOAD
================================ */

const uploadButton =
document.getElementById("uploadPrescriptionBtn");

const prescriptionFile =
document.getElementById("prescriptionFile");

const fileName =
document.getElementById("fileName");

uploadButton.addEventListener("click", function () {

prescriptionFile.click();

});

prescriptionFile.addEventListener("change", function () {

if (prescriptionFile.files.length > 0) {

    fileName.innerText =
        "✓ Selected: " +
        prescriptionFile.files[0].name;

}

});

/* ================================
CONSOLE MESSAGE
================================ */

console.log(
"MedEase Pharmacy Website loaded successfully! 💊"
);
