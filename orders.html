/* =========================================
   MEDEASE - ONLINE PHARMACY
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   CART DATA
========================================= */

let cart = JSON.parse(localStorage.getItem("medeaseCart")) || [];


/* =========================================
   ELEMENTS
========================================= */

const cartCount = document.getElementById("cartCount");
const cartBtn = document.getElementById("cartBtn");

const addCartButtons = document.querySelectorAll(".add-cart");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchMessage = document.getElementById("searchMessage");

const orderMedicinesBtn =
    document.getElementById("orderMedicinesBtn");

const browseCategoriesBtn =
    document.getElementById("browseCategoriesBtn");

const loginBtn =
    document.getElementById("loginBtn");

const uploadPrescriptionBtn =
    document.getElementById("uploadPrescriptionBtn");

const prescriptionFile =
    document.getElementById("prescriptionFile");

const fileName =
    document.getElementById("fileName");


/* =========================================
   CART COUNT
========================================= */

function updateCartCount() {

    let total = 0;

    cart.forEach(function (item) {
        total += item.quantity;
    });

    if (cartCount) {
        cartCount.textContent = total;
    }
}


/* =========================================
   SAVE CART
========================================= */

function saveCart() {

    localStorage.setItem(
        "medeaseCart",
        JSON.stringify(cart)
    );

    updateCartCount();
}


/* =========================================
   ADD TO CART
========================================= */

addCartButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        const productName =
            button.getAttribute("data-product");

        const productPrice =
            Number(button.getAttribute("data-price"));

        if (!productName || !productPrice) {
            return;
        }

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


        const originalText =
            button.textContent;

        button.textContent = "Added ✓";

        button.disabled = true;


        setTimeout(function () {

            button.textContent =
                originalText;

            button.disabled = false;

        }, 1000);

    });

});


/* =========================================
   CART BUTTON
========================================= */

if (cartBtn) {

    cartBtn.addEventListener("click", function () {

        if (cart.length === 0) {

            alert("Your cart is empty. Please add a medicine first. 💊");

        } else {

            window.location.href = "cart.html";

        }

    });

}


/* =========================================
   SEARCH FUNCTION
========================================= */

function performSearch() {

    if (!searchInput) {
        return;
    }

    const value =
        searchInput.value.trim().toLowerCase();

    const products =
        document.querySelectorAll(".product-card");


    if (value === "") {

        if (searchMessage) {
            searchMessage.textContent =
                "Please enter a medicine name.";
        }

        products.forEach(function (product) {
            product.style.display = "";
        });

        return;
    }


    let found = false;


    products.forEach(function (product) {

        const productName =
            (
                product.getAttribute("data-name") || ""
            ).toLowerCase();


        if (productName.includes(value)) {

            product.style.display = "";
            found = true;

        } else {

            product.style.display = "none";

        }

    });


    const medicinesSection =
        document.getElementById("medicines");


    if (medicinesSection) {

        medicinesSection.scrollIntoView({
            behavior: "smooth"
        });

    }


    if (searchMessage) {

        if (found) {

            searchMessage.textContent =
                "✓ Product found!";

        } else {

            searchMessage.textContent =
                "No matching product found.";

        }

    }

}


/* Search button */

if (searchBtn) {

    searchBtn.addEventListener(
        "click",
        performSearch
    );

}


/* Search using Enter */

if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {
                performSearch();
            }

        }
    );

}


/* =========================================
   ORDER MEDICINES BUTTON
========================================= */

if (orderMedicinesBtn) {

    orderMedicinesBtn.addEventListener(
        "click",
        function () {

            const medicines =
                document.getElementById("medicines");

            if (medicines) {

                medicines.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

}


/* =========================================
   BROWSE CATEGORIES BUTTON
========================================= */

if (browseCategoriesBtn) {

    browseCategoriesBtn.addEventListener(
        "click",
        function () {

            const categories =
                document.getElementById("categories");

            if (categories) {

                categories.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

}


/* =========================================
   LOGIN BUTTON
========================================= */

if (loginBtn) {

    loginBtn.addEventListener(
        "click",
        function () {

            window.location.href =
                "login.html";

        }
    );

}


/* =========================================
   VIEW PRODUCT
========================================= */

function viewProduct(productName) {

    window.location.href =
        "medicine-details.html?product=" +
        encodeURIComponent(productName);

}


/* =========================================
   CATEGORY CARDS
========================================= */

const categoryCards =
    document.querySelectorAll(".category-card");


categoryCards.forEach(function (card) {

    card.addEventListener("click", function () {

        const categoryTitle =
            card.querySelector("h3");


        if (!categoryTitle) {
            return;
        }


        const categoryName =
            categoryTitle.textContent.trim();


        if (searchInput) {

            searchInput.value =
                categoryName;

        }


        const searchSection =
            document.querySelector(".search-section");


        if (searchSection) {

            searchSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


/* =========================================
   PRESCRIPTION UPLOAD
========================================= */

if (
    uploadPrescriptionBtn &&
    prescriptionFile
) {

    uploadPrescriptionBtn.addEventListener(
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
                prescriptionFile.files &&
                prescriptionFile.files.length > 0
            ) {

                const selectedFile =
                    prescriptionFile.files[0];


                if (fileName) {

                    fileName.textContent =
                        "✓ Selected: " +
                        selectedFile.name;

                }

            }

        }
    );

}


/* =========================================
   NAVIGATION LINKS
========================================= */

const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


navLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const href =
            link.getAttribute("href");


        if (
            href &&
            href.startsWith("#")
        ) {

            const section =
                document.querySelector(href);


            if (section) {

                event.preventDefault();

                section.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }

    });

});


/* =========================================
   INITIALIZE
========================================= */

updateCartCount();


console.log(
    "MedEase loaded successfully 💊"
);
