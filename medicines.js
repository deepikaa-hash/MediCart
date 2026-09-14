/* =========================
   CART
========================= */

let cart =
    JSON.parse(localStorage.getItem("medEaseCart")) || [];


/* =========================
   ELEMENTS
========================= */

const medicineSearch =
    document.getElementById("medicineSearch");

const products =
    document.querySelectorAll(".product-card");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const cartButton =
    document.getElementById("cartButton");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutButton =
    document.getElementById("checkoutButton");

const cartCount =
    document.getElementById("cartCount");


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    /* Clear cart display */

    cartItems.innerHTML = "";


    let total = 0;

    let totalItems = 0;


    /* =========================
       EMPTY CART
    ========================== */

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add medicines to your cart
                    to continue.
                </p>

            </div>
        `;

    }


    /* =========================
       CART ITEMS
    ========================== */

    cart.forEach(function(item, index) {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;

        totalItems += item.quantity;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ₹${item.price} × ${item.quantity}
                </p>

            </div>


            <div class="cart-item-right">

                <strong>
                    ₹${itemTotal}
                </strong>


                <div class="quantity-controls">

                    <button
                        class="quantity-btn"
                        onclick="decreaseQuantity(${index})">

                        −

                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        class="quantity-btn"
                        onclick="increaseQuantity(${index})">

                        +

                    </button>

                </div>


                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})">

                    Remove

                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    /* =========================
       UPDATE TOTALS
    ========================== */

    cartTotal.textContent =
        `₹${total}`;


    cartCount.textContent =
        totalItems;


    /* =========================
       SAVE CART
    ========================== */

    localStorage.setItem(
        "medEaseCart",
        JSON.stringify(cart)
    );

}


/* =========================
   ADD TO CART
========================= */

function addToCart(name, price) {

    const existingItem =
        cart.find(function(item) {

            return item.name === name;

        });


    /* Already exists */

    if (existingItem) {

        existingItem.quantity++;

    }


    /* New item */

    else {

        cart.push({

            name: name,

            price: price,

            quantity: 1

        });

    }


    /* Update */

    updateCart();


    /* Feedback */

    showAddedMessage();

}


/* =========================
   INCREASE QUANTITY
========================= */

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}


/* =========================
   DECREASE QUANTITY
========================= */

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    }

    else {

        cart.splice(index, 1);

    }


    updateCart();

}


/* =========================
   REMOVE ITEM
========================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* =========================
   SHOW ADDED MESSAGE
========================= */

function showAddedMessage() {

    const message =
        document.createElement("div");


    message.className =
        "cart-added-message";


    message.textContent =
        "✓ Added to cart";


    document.body.appendChild(message);


    setTimeout(function() {

        message.remove();

    }, 1500);

}


/* =========================
   SEARCH MEDICINES
========================= */

medicineSearch.addEventListener(
    "input",
    function() {

        const searchValue =
            medicineSearch.value
                .toLowerCase()
                .trim();


        products.forEach(function(product) {

            const productName =
                product.dataset.name
                    .toLowerCase();


            const productCategory =
                product.dataset.category
                    .toLowerCase();


            if (
                productName.includes(searchValue) ||
                productCategory.includes(searchValue)
            ) {

                product.style.display =
                    "block";

            }

            else {

                product.style.display =
                    "none";

            }

        });

    }
);


/* =========================
   CATEGORY FILTER
========================= */

filterButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {


            /* Remove active */

            filterButtons.forEach(
                function(btn) {

                    btn.classList.remove(
                        "active"
                    );

                }
            );


            /* Add active */

            button.classList.add(
                "active"
            );


            const selectedCategory =
                button.dataset.category;


            products.forEach(
                function(product) {


                    const productCategory =
                        product.dataset.category;


                    if (
                        selectedCategory === "all" ||
                        productCategory === selectedCategory
                    ) {

                        product.style.display =
                            "block";

                    }

                    else {

                        product.style.display =
                            "none";

                    }

                }
            );

        }
    );

});


/* =========================
   OPEN CART
========================= */

cartButton.addEventListener(
    "click",
    function() {

        cartOverlay.classList.add(
            "show"
        );

    }
);


/* =========================
   CLOSE CART
========================= */

closeCart.addEventListener(
    "click",
    function() {

        cartOverlay.classList.remove(
            "show"
        );

    }
);


/* =========================
   CLOSE CART WHEN CLICK
   OUTSIDE
========================= */

cartOverlay.addEventListener(
    "click",
    function(event) {

        if (
            event.target === cartOverlay
        ) {

            cartOverlay.classList.remove(
                "show"
            );

        }

    }
);


/* =========================
   CHECKOUT
========================= */

checkoutButton.addEventListener(
    "click",
    function() {


        if (cart.length === 0) {

            alert(
                "Your cart is empty. Please add medicines first."
            );

            return;

        }


        window.location.href =
            "checkout.html";

    }
);


/* =========================
   ADD BUTTONS
========================= */

const addButtons =
    document.querySelectorAll(
        ".add-btn"
    );


addButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const name =
                button.dataset.name;


            const price =
                Number(
                    button.dataset.price
                );


            addToCart(
                name,
                price
            );

        }
    );

});


/* =========================
   LOAD CART ON PAGE LOAD
========================= */

updateCart();
