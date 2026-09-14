/* =========================
   LOAD ORDERS
========================= */

let orders =
    JSON.parse(localStorage.getItem("medEaseOrders")) || [];


/* =========================
   DISPLAY ORDERS
========================= */

function displayOrders() {

    const ordersList =
        document.getElementById("ordersList");

    const emptyOrders =
        document.getElementById("emptyOrders");


    /* No Orders */

    if (orders.length === 0) {

        ordersList.innerHTML = "";

        emptyOrders.style.display = "block";

        return;
    }


    /* Orders Available */

    emptyOrders.style.display = "none";

    ordersList.innerHTML = "";


    orders.forEach(function(order) {

        let itemsHTML = "";


        order.items.forEach(function(item) {

            itemsHTML += `
                <div class="order-item">

                    <div>

                        <span class="item-name">
                            ${item.name}
                        </span>

                        <span class="item-quantity">
                            × ${item.quantity}
                        </span>

                    </div>

                    <div>
                        ₹${item.price * item.quantity}
                    </div>

                </div>
            `;

        });


        ordersList.innerHTML += `

            <div class="order-card">

                <div class="order-top">

                    <div>

                        <div class="order-id">
                            Order #${order.orderId}
                        </div>

                        <div class="order-date">
                            ${order.date}
                        </div>

                    </div>

                    <div class="status ${order.status === "Delivered" ? "delivered" : "processing"}">

                        ${order.status}

                    </div>

                </div>


                <div class="order-items">

                    ${itemsHTML}

                </div>


                <div class="order-bottom">

                    <div>

                        <div class="total-label">
                            Total Amount
                        </div>

                        <div class="total-price">
                            ₹${order.total}
                        </div>

                    </div>


                    <div class="payment-method">

                        Payment:
                        ${order.paymentMethod}

                    </div>

                </div>

            </div>

        `;

    });

}


/* =========================
   CONTINUE SHOPPING
========================= */

function goToMedicines() {

    window.location.href = "medicines.html";

}


/* =========================
   START
========================= */

displayOrders();
