/* =========================
   LOAD CART
========================= */

let cart =
    JSON.parse(localStorage.getItem("medEaseCart")) || [];


/* =========================
   GET HTML ELEMENTS
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


/* =========================
   DISPLAY ORDER SUMMARY
========================= */

function displayOrderSummary() {

    /* Cart is empty */

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


    /* Clear previous items */

    summaryItems.innerHTML = "";


    let subtotal = 0;


    /* Display each product */

    cart.forEach(function(item) {

        const itemTotal =
            item.price * item.quantity;

        subtotal += itemTotal;


        const itemElement =
            document.createElement("div");

        itemElement.className = "summary-item";


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


    /* =========================
       DELIVERY CHARGE
    ========================= */

    let deliveryCharge = 0;


    /*
       Free delivery for orders
       ₹500 or above
    */

    if (subtotal < 500) {

        deliveryCharge = 40;

    }


    /* =========================
       FINAL TOTAL
    ========================= */

    const total =
        subtotal + deliveryCharge;


    /* Display values */

    subtotalElement.textContent =
        `₹${subtotal}`;

    if (deliveryCharge === 0) {

        deliveryElement.textContent =
            "FREE";

    } else {

        deliveryElement.textContent =
            `₹${deliveryCharge}`;

    }

    totalElement.textContent =
        `₹${total}`;

}


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
   VALIDATE FORM
========================= */

function validateForm() {

    const fullName =
        document.getElementById("fullName").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const address =
        document.getElementById("address").value.trim();

    const city =
        document.getElementById("city").value.trim();

    const pincode =
        document.getElementById("pincode").value.trim();


    /* Check empty fields */

    if (
        fullName === "" ||
        phone === "" ||
        address === "" ||
        city === "" ||
        pincode === ""
    ) {

        alert(
            "Please fill in all delivery address fields."
        );

        return false;

    }


    /* Validate phone */

    if (!/^[0-9]{10}$/.test(phone)) {

        alert(
            "Please enter a valid 10-digit phone number."
        );

        return false;

    }


    /* Validate pincode */

    if (!/^[0-9]{6}$/.test(pincode)) {

        alert(
            "Please enter a valid 6-digit pincode."
        );

        return false;

    }


    return true;

}


/* =========================
   PLACE ORDER
========================= */

placeOrderButton.addEventListener(
    "click",
    function() {


        /* =========================
           CHECK CART
        ========================= */

        if (cart.length === 0) {

            alert(
                "Your cart is empty. Please add medicines before checkout."
            );

            window.location.href =
                "medicines.html";

            return;

        }


        /* =========================
           VALIDATE FORM
        ========================= */

        if (!validateForm()) {

            return;

        }


        /* =========================
           GET PAYMENT
        ========================= */

        const paymentMethod =
            getPaymentMethod();


        if (!paymentMethod) {

            alert(
                "Please select a payment method."
            );

            return;

        }


        /* =========================
           CALCULATE TOTAL
        ========================= */

        let subtotal = 0;


        cart.forEach(function(item) {

            subtotal +=
                item.price * item.quantity;

        });


        let deliveryCharge = 0;


        if (subtotal < 500) {

            deliveryCharge = 40;

        }


        const total =
            subtotal + deliveryCharge;


        /* =========================
           GENERATE ORDER ID
        ========================= */

        const orderId =
            generateOrderId();


        /* =========================
           GET CUSTOMER DETAILS
        ========================= */

        const customerDetails = {

            fullName:
                document
                    .getElementById("fullName")
                    .value
                    .trim(),

            phone:
                document
                    .getElementById("phone")
                    .value
                    .trim(),

            address:
                document
                    .getElementById("address")
                    .value
                    .trim(),

            city:
                document
                    .getElementById("city")
                    .value
                    .trim(),

            pincode:
                document
                    .getElementById("pincode")
                    .value
                    .trim()

        };


        /* =========================
           PAYMENT NAME
        ========================= */

        let paymentName;


        if (paymentMethod === "cod") {

            paymentName =
                "Cash on Delivery";

        } else if (paymentMethod === "upi") {

            paymentName =
                "UPI";

        } else if (paymentMethod === "card") {

            paymentName =
                "Card";

        }


        /* =========================
           CREATE ORDER OBJECT
        ========================= */

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

            deliveryCharge: deliveryCharge,

            total: total,

            paymentMethod: paymentName,

            customer: customerDetails,

            status: "Processing"

        };


        /* =========================
           GET OLD ORDERS
        ========================= */

        let existingOrders =
            JSON.parse(
                localStorage.getItem(
                    "medEaseOrders"
                )
            ) || [];


        /* =========================
           ADD NEW ORDER
        ========================= */

        existingOrders.unshift(
            newOrder
        );


        /* =========================
           SAVE ORDER
        ========================= */

        localStorage.setItem(
            "medEaseOrders",
            JSON.stringify(
                existingOrders
            )
        );


        /* =========================
           SHOW SUCCESS POPUP
        ========================= */

        orderIdElement.textContent =
            orderId;


        successOverlay.style.display =
            "flex";


        /* =========================
           CLEAR CART
        ========================= */

        localStorage.removeItem(
            "medEaseCart"
        );


        /* Prevent duplicate order */

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
   DISPLAY SUMMARY ON PAGE LOAD
========================= */

displayOrderSummary();
