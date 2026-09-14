/* =========================
   LOAD CART
========================= */

let cart =
    JSON.parse(localStorage.getItem("medEaseCart")) || [];


/* =========================
   GET ELEMENTS
========================= */

const summaryItems =
    document.getElementById("summaryItems");

const subtotalElement =
    document.getElementById("subtotal");

const deliveryElement =
    document.getElementById("delivery");

const totalElement =
    document.getElementById("total");

const placeOrderButton =
    document.getElementById("placeOrder");

const successOverlay =
    document.getElementById("successOverlay");

const orderIdElement =
    document.getElementById("orderId");

const continueShoppingButton =
    document.getElementById("continueShopping");

const paymentDetails =
    document.getElementById("paymentDetails");

const upiPayment =
    document.getElementById("upiPayment");

const cardPayment =
    document.getElementById("cardPayment");

const codPayment =
    document.getElementById("codPayment");

const paymentDescription =
    document.getElementById("paymentDescription");


/* =========================
   DISPLAY ORDER SUMMARY
========================= */

function displayOrderSummary() {

    if (cart.length === 0) {

        summaryItems.innerHTML = `
            <div class="empty-summary">
                Your cart is empty.
            </div>
        `;

        subtotalElement.textContent = "₹0";
        deliveryElement.textContent = "₹0";
        totalElement.textContent = "₹0";

        return;
    }


    summaryItems.innerHTML = "";

    let subtotal = 0;


    cart.forEach(function(item) {

        const itemTotal =
            item.price * item.quantity;

        subtotal += itemTotal;


        const itemElement =
            document.createElement("div");

        itemElement.className =
            "summary-item";


        itemElement.innerHTML = `

            <div class="summary-item-info">

                <div class="summary-item-name">
                    ${item.name}
                </div>

                <div class="summary-item-quantity">
                    Quantity: ${item.quantity}
                </div>

            </div>

            <div class="summary-item-price">
                ₹${itemTotal}
            </div>

        `;


        summaryItems.appendChild(itemElement);

    });


    let deliveryCharge = 0;


    if (subtotal < 500) {

        deliveryCharge = 40;

    }


    const total =
        subtotal + deliveryCharge;


    subtotalElement.textContent =
        `₹${subtotal}`;

    deliveryElement.textContent =
        deliveryCharge === 0
            ? "FREE"
            : `₹${deliveryCharge}`;

    totalElement.textContent =
        `₹${total}`;

}


/* =========================
   PAYMENT METHOD CHANGE
========================= */

const paymentRadios =
    document.querySelectorAll(
        'input[name="payment"]'
    );


paymentRadios.forEach(function(radio) {

    radio.addEventListener(
        "change",
        function() {

            paymentDetails.style.display =
                "block";


            upiPayment.style.display =
                "none";

            cardPayment.style.display =
                "none";

            codPayment.style.display =
                "none";


            /* UPI */

            if (this.value === "upi") {

                upiPayment.style.display =
                    "block";

                paymentDescription.textContent =
                    "Enter your UPI ID to continue.";

            }


            /* CARD */

            else if (this.value === "card") {

                cardPayment.style.display =
                    "block";

                paymentDescription.textContent =
                    "Enter your card details to continue.";

            }


            /* COD */

            else {

                codPayment.style.display =
                    "block";

                paymentDescription.textContent =
                    "Pay when your order arrives.";

            }

        }
    );

});


/* =========================
   DEFAULT PAYMENT
========================= */

paymentDetails.style.display =
    "block";

codPayment.style.display =
    "block";


/* =========================
   GENERATE ORDER ID
========================= */

function generateOrderId() {

    return (
        "MED" +
        Math.floor(
            100000 +
            Math.random() * 900000
        )
    );

}


/* =========================
   GET PAYMENT METHOD
========================= */

function getPaymentMethod() {

    const selectedPayment =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    if (!selectedPayment) {

        return null;

    }


    return selectedPayment.value;

}


/* =========================
   VALIDATE DELIVERY FORM
========================= */

function validateDeliveryForm() {

    const fullName =
        document.getElementById("fullName")
            .value.trim();

    const phone =
        document.getElementById("phone")
            .value.trim();

    const address =
        document.getElementById("address")
            .value.trim();

    const city =
        document.getElementById("city")
            .value.trim();

    const pincode =
        document.getElementById("pincode")
            .value.trim();


    if (
        fullName === "" ||
        phone === "" ||
        address === "" ||
        city === "" ||
        pincode === ""
    ) {

        alert(
            "Please fill in all delivery details."
        );

        return false;

    }


    if (!/^[0-9]{10}$/.test(phone)) {

        alert(
            "Please enter a valid 10-digit phone number."
        );

        return false;

    }


    if (!/^[0-9]{6}$/.test(pincode)) {

        alert(
            "Please enter a valid 6-digit pincode."
        );

        return false;

    }


    return true;

}


/* =========================
   VALIDATE PAYMENT
========================= */

function validatePayment(paymentMethod) {


    /* COD */

    if (paymentMethod === "cod") {

        return true;

    }


    /* UPI */

    if (paymentMethod === "upi") {

        const upiId =
            document.getElementById("upiId")
                .value.trim();


        if (upiId === "") {

            alert(
                "Please enter your UPI ID."
            );

            return false;

        }


        if (!upiId.includes("@")) {

            alert(
                "Please enter a valid UPI ID."
            );

            return false;

        }


        return true;

    }


    /* CARD */

    if (paymentMethod === "card") {

        const cardNumber =
            document.getElementById("cardNumber")
                .value
                .replace(/\s/g, "");

        const expiry =
            document.getElementById("expiry")
                .value.trim();

        const cvv =
            document.getElementById("cvv")
                .value.trim();


        if (cardNumber === "") {

            alert(
                "Please enter your card number."
            );

            return false;

        }


        if (!/^[0-9]{16}$/.test(cardNumber)) {

            alert(
                "Please enter a valid 16-digit card number."
            );

            return false;

        }


        if (!/^[0-9]{2}\/[0-9]{2}$/.test(expiry)) {

            alert(
                "Please enter expiry date as MM/YY."
            );

            return false;

        }


        if (!/^[0-9]{3}$/.test(cvv)) {

            alert(
                "Please enter a valid 3-digit CVV."
            );

            return false;

        }


        return true;

    }


    return false;

}


/* =========================
   PLACE ORDER
========================= */

placeOrderButton.addEventListener(
    "click",
    function() {


        /* CART CHECK */

        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            window.location.href =
                "medicines.html";

            return;

        }


        /* DELIVERY VALIDATION */

        if (!validateDeliveryForm()) {

            return;

        }


        /* PAYMENT */

        const paymentMethod =
            getPaymentMethod();


        if (!paymentMethod) {

            alert(
                "Please select a payment method."
            );

            return;

        }


        /* PAYMENT VALIDATION */

        if (!validatePayment(paymentMethod)) {

            return;

        }


        /* =========================
           CALCULATE TOTAL
        ========================== */

        let subtotal = 0;


        cart.forEach(function(item) {

            subtotal +=
                item.price * item.quantity;

        });


        const deliveryCharge =
            subtotal >= 500 ? 0 : 40;


        const total =
            subtotal + deliveryCharge;


        /* =========================
           ORDER ID
        ========================== */

        const orderId =
            generateOrderId();


        /* =========================
           CUSTOMER DETAILS
        ========================== */

        const customer = {

            fullName:
                document
                    .getElementById("fullName")
                    .value.trim(),

            phone:
                document
                    .getElementById("phone")
                    .value.trim(),

            address:
                document
                    .getElementById("address")
                    .value.trim(),

            city:
                document
                    .getElementById("city")
                    .value.trim(),

            pincode:
                document
                    .getElementById("pincode")
                    .value.trim()

        };


        /* =========================
           PAYMENT NAME
        ========================== */

        let paymentName;


        if (paymentMethod === "cod") {

            paymentName =
                "Cash on Delivery";

        }

        else if (paymentMethod === "upi") {

            paymentName =
                "UPI";

        }

        else {

            paymentName =
                "Card";

        }


        /* =========================
           CREATE ORDER
        ========================== */

        const newOrder = {

            orderId: orderId,

            date:
                new Date().toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    }
                ),

            items: cart,

            subtotal: subtotal,

            deliveryCharge:
                deliveryCharge,

            total: total,

            paymentMethod:
                paymentName,

            customer:
                customer,

            status:
                "Processing"

        };


        /* =========================
           SAVE ORDER
        ========================== */

        let existingOrders =
            JSON.parse(
                localStorage.getItem(
                    "medEaseOrders"
                )
            ) || [];


        existingOrders.unshift(
            newOrder
        );


        localStorage.setItem(
            "medEaseOrders",
            JSON.stringify(
                existingOrders
            )
        );


        /* =========================
           SHOW SUCCESS
        ========================== */

        orderIdElement.textContent =
            orderId;


        successOverlay.style.display =
            "flex";


        /* =========================
           CLEAR CART
        ========================== */

        localStorage.removeItem(
            "medEaseCart"
        );

        cart = [];


    }
);


/* =========================
   CONTINUE SHOPPING
========================= */

continueShoppingButton.addEventListener(
    "click",
    function() {

        window.location.href =
            "medicines.html";

    }
);


/* =========================
   LOAD SUMMARY
========================= */

displayOrderSummary();
