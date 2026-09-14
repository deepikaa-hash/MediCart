// ================================
// PHARMACY WEBSITE - SCRIPT
// ================================


// -------------------------------
// CART
// -------------------------------

let cartCount = 0;


// Select all Add buttons
const addButtons = document.querySelectorAll(".product-bottom button");


// Add medicine to cart
addButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        cartCount++;

        // Update cart button
        const cartButton = document.querySelector(".cart-btn");

        cartButton.innerHTML = "🛒 Cart (" + cartCount + ")";

        // Change button temporarily
        button.innerHTML = "Added ✓";

        button.style.background = "#2e8b57";

        setTimeout(function () {

            button.innerHTML = "Add +";

            button.style.background = "#126b45";

        }, 1200);

    });

});


// -------------------------------
// SEARCH
// -------------------------------

const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");


// Search button click
searchButton.addEventListener("click", function () {

    const searchValue = searchInput.value.trim();

    if (searchValue === "") {

        alert("Please enter a medicine or product name.");

        return;
    }

    alert(
        "Searching for: " + searchValue
    );

});


// Search when pressing Enter
searchInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        searchButton.click();

    }

});


// -------------------------------
// ORDER MEDICINES BUTTON
// -------------------------------

const orderButton = document.querySelector(".primary-btn");

orderButton.addEventListener("click", function () {

    document.querySelector("#medicines").scrollIntoView({
        behavior: "smooth"
    });

});


// -------------------------------
// BROWSE CATEGORIES BUTTON
// -------------------------------

const browseButton = document.querySelector(".secondary-btn");

browseButton.addEventListener("click", function () {

    document.querySelector("#categories").scrollIntoView({
        behavior: "smooth"
    });

});


// -------------------------------
// LOGIN BUTTON
// -------------------------------

const loginButton = document.querySelector(".login-btn");

loginButton.addEventListener("click", function () {

    alert("Login page will be available soon!");

});


// -------------------------------
// CART BUTTON
// -------------------------------

const cartButton = document.querySelector(".cart-btn");

cartButton.addEventListener("click", function () {

    if (cartCount === 0) {

        alert("Your cart is empty.");

    } else {

        alert(
            "You have " +
            cartCount +
            " item(s) in your cart."
        );

    }

});


// -------------------------------
// CATEGORY CARDS
// -------------------------------

const categoryCards = document.querySelectorAll(".category-card");

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


// -------------------------------
// PAGE LOADED MESSAGE
// -------------------------------

console.log(
    "MedEase Pharmacy Website loaded successfully!"
);
