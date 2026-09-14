/* ================================
MEDEASE PHARMACY WEBSITE
JAVASCRIPT
================================ */

/* ================================
CART
================================ */

let cart = JSON.parse(localStorage.getItem("medeaseCart")) || [];

const addButtons = document.querySelectorAll(".add-cart");
const cartCountElement = document.getElementById("cartCount");
const cartButton = document.getElementById("cartBtn");

/* ================================
UPDATE CART COUNT
================================ */

function updateCartCount() {

let totalItems = 0;

cart.forEach(function (item) {

    totalItems += item.quantity;

});

if (cartCountElement) {

    cartCountElement.innerText = totalItems;

}

}

/* ================================
SAVE CART
================================ */

function saveCart() {

localStorage.setItem(
    "medeaseCart",
    JSON.stringify(cart)
);

updateCartCount();

}

/* ================================
ADD TO CART
================================ */

addButtons.forEach(function (button) {

button.addEventListener("click", function () {

    const productName =
        button.dataset.product;

    const productPrice =
        Number(button.dataset.price);


    const existingProduct =
        cart.find(function (item) {

            return item.name === productName;

        });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            name: productName,
            price: productPrice,
            quantity: 1

        });

    }


    saveCart();


    button.innerText = "Added ✓";


    setTimeout(function () {

        button.innerText = "Add +";

    }, 1200);

});

});

/* ================================
CART BUTTON
================================ */

if (cartButton) {

cartButton.addEventListener("click", function () {

    if (cart.length === 0) {

        alert("Your cart is empty. 💊");

    } else {

        window.location.href = "cart.html";

    }

});

}

/* ================================
SEARCH
================================ */

const searchInput =
document.getElementById("searchInput");

const searchButton =
document.getElementById("searchBtn");

const searchMessage =
document.getElementById("searchMessage");

function performSearch() {

const searchValue =
    searchInput.value.trim().toLowerCase();

const products =
    document.querySelectorAll(".product-card");


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


document
    .querySelector("#medicines")
    .scrollIntoView({
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

if (searchButton) {

searchButton.addEventListener(
    "click",
    performSearch
);

}

if (searchInput) {

searchInput.addEventListener(
    "keypress",
    function (event) {

        if (event.key === "Enter") {

            performSearch();

        }

    }
);

}

/* ================================
ORDER MEDICINES
================================ */

const orderButton =
document.getElementById("orderMedicinesBtn");

if (orderButton) {

orderButton.addEventListener(
    "click",
    function () {

        document
            .querySelector("#medicines")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);

}

/* ================================
BROWSE CATEGORIES
================================ */

const browseButton =
document.getElementById("browseCategoriesBtn");

if (browseButton) {

browseButton.addEventListener(
    "click",
    function () {

        document
            .querySelector("#categories")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);

}

/* ================================
LOGIN
================================ */

const loginButton =
document.getElementById("loginBtn");

if (loginButton) {

loginButton.addEventListener(
    "click",
    function () {

        window.location.href = "login.html";

    }
);

}

/* ================================
CATEGORY CARDS
================================ */

const categoryCards =
document.querySelectorAll(".category-card");

categoryCards.forEach(function (card) {

card.addEventListener(
    "click",
    function () {

        const categoryName =
            card.querySelector("h3").innerText;


        if (searchInput) {

            searchInput.value =
                categoryName;

        }


        document
            .querySelector(".search-section")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);

});

/* ================================
PRESCRIPTION UPLOAD
================================ */

const uploadButton =
document.getElementById(
"uploadPrescriptionBtn"
);

const prescriptionFile =
document.getElementById(
"prescriptionFile"
);

const fileName =
document.getElementById("fileName");

if (uploadButton && prescriptionFile) {

uploadButton.addEventListener(
    "click",
    function () {

        prescriptionFile.click();

    }
);

}

if (prescriptionFile) {

prescriptionFile.addEventListener(
    "change",
    function () {

        if (
            prescriptionFile.files.length > 0
        ) {

            fileName.innerText =
                "✓ Selected: " +
                prescriptionFile.files[0].name;

        }

    }
);

}

/* ================================
INITIAL CART COUNT
================================ */

updateCartCount();

/* ================================
CONSOLE MESSAGE
================================ */

console.log(
"MedEase Pharmacy Website loaded successfully! 💊"
);
