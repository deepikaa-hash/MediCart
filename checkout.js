// =====================================
// CHECKOUT PAGE
// =====================================


// Get cart from medicines page
// For now, we use sample cart data if
// the page is opened directly.

let cart = JSON.parse(
    localStorage.getItem("medEaseCart")
) || [];


// =====================================
// ELEMENTS
// =====================================

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

const continueShopping =
    document.getElementById("continueShopping");


// =====================================
// DISPLAY ORDER SUMMARY
// =====================================

function displaySummary() {

    if (cart.length === 0) {

        summaryItems.innerHTML = `

            <p>
                Your cart is empty.
            </p>

        `;

        subtotalElement.innerText = "₹0";

        deliveryElement.innerText = "₹0";

        totalElement.innerText = "₹0";

        return;
    }


    summaryItems.innerHTML = "";


    let subtotal = 0;


    cart.forEach(function (item) {

        const itemTotal =
            item.price * item.quantity;


        subtotal += itemTotal;


        const itemElement =
            document.createElement("div");


        itemElement.className =
            "summary-item";


        itemElement.innerHTML = `

            <div>

                <h4>
                    ${item.name}
                </h4>

                <p>
                    Quantity: ${item.quantity}
                </p>

            </div>

            <strong>
                ₹${itemTotal}
            </strong>

        `;


        summaryItems.appendChild(
            itemElement
        );

    });


    // Delivery charge

    const delivery =
        subtotal >= 500 ? 0 : 40;


    const total =
        subtotal + delivery;


    subtotalElement.innerText =
        "₹" + subtotal;


    deliveryElement.innerText =
        delivery === 0
            ? "FREE"
            : "₹" + delivery;


    totalElement.innerText =
        "₹" + total;

}


// Run when page loads
displaySummary();


// =====================================
// PLACE ORDER
// =====================================

placeOrderButton.addEventListener(
    "click",
    function () {


        // Get form values

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


        // Check cart

        if (cart.length === 0) {

            alert(
                "Your cart is empty. Please add a medicine first."
            );

            window.location.href =
                "medicines.html";

            return;

        }


        // Check form

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

            return;

        }


        // Validate phone

        if (
            phone.length !== 10 ||
            isNaN(phone)
        ) {

            alert(
                "Please enter a valid 10-digit phone number."
            );

            return;

        }


        // Validate pincode

        if (
            pincode.length !== 6 ||
            isNaN(pincode)
        ) {

            alert(
                "Please enter a valid 6-digit pincode."
            );

            return;

        }


        // Get payment method

        const paymentMethod =
            document.querySelector(
                'input[name="payment"]:checked'
            ).value;


        console.log(
            "Payment Method:",
            paymentMethod
        );


        // Generate order ID

        const orderId =
            "MED" +
            Math.floor(
                100000 +
                Math.random() * 900000
            );


        orderIdElement.innerText =
            orderId;


        // Show success modal

        successOverlay.style.display =
            "flex";


        // Clear cart

        localStorage.removeItem(
            "medEaseCart"
        );


        cart = [];

    }
);


// =====================================
// CONTINUE SHOPPING
// =====================================

continueShopping.addEventListener(
    "click",
    function () {

        window.location.href =
            "medicines.html";

    }
);
