let cartsContain = document.querySelector("#mainContain");
let carts;

fetch("http://localhost:3000/cart")
  .then((response) => response.json())
  .then((data) => {
    if (data.length > 0) {
      cartsContain.innerHTML = "";
      cartsContain.innerHTML += `
        <div>
        <h3>My cart</h3>
        </div>
        <div id="cartsList"></div>
        <div id="total">
        <div id="totalDiv">
        <p id="sum"></p>
        <button id="btnPurchase">Purchase</button>
        </div>
        </div>
        `;
      let cartsList = document.querySelector("#cartsList");
      let cum = 0;
      data.forEach((cart) => {
        cum += cart.price;
        let dates = new Date(cart.date);
        let hours = dates.getHours();
        let minutes = dates.getMinutes();
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (hours < 10) {
          hours = "0" + hours;
        }
        cartsList.innerHTML += `
            <div class="cart">
            <div class="dep-arr">
            <p class="depart">${cart.departure}</p>
            <p class="space">></p>
            <p class="arrivée">${cart.arrival}</p>
            </div>
            <p class="hours">${hours}:${minutes}</p> 
            <p class="price">${cart.price}€</p>
            <button class="delete" 
            id="btn-delete"
            data-depart="${cart.departure}"
            data-arrivee="${cart.arrival}"
            data-date="${dates}"
            data-price="${cart.price}"
            >
            X
            </button>
            </div>
            `;
        document.querySelector("#sum").textContent = `Total: ${cum}€`;
        carts = document.querySelectorAll(".delete");
        carts?.forEach((e) => {
          e.addEventListener("click", () => {
            const depart = e.dataset.depart;
            const arrivee = e.dataset.arrivee;
            const date = e.dataset.date;
            const price = Number(e.dataset.price);
            fetch("http://localhost:3000/cart/delete", {
              headers: {
                "Content-Type": "application/json",
              },
              method: "DELETE",
              body: JSON.stringify({
                departure: depart,
                arrival: arrivee,
                date: date,
              }),
            });
            cum -= price;
            e.parentNode.remove();
            document.querySelector("#sum").textContent = `Total: ${cum}€`;
            if (cum === 0) {
              cartsContain.innerHTML = `
                        <p class="noTicketMsg">No ticket in your cart.</p>
                        <p class="noTicketMsg">Why not plan a trip ?</p>
                    `;
            }
          });
        });
        document.querySelector("#btnPurchase").addEventListener("click", async () => {
          await fetch("http://localhost:3000/booking/save", {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          })
          .then(response => response.json())
          .then(data => console.log(data))

          fetch("http://localhost:3000/cart/deleteAll", {
            headers: {
              "Content-Type": "application/json",
            },
            method: "DELETE",
          })
          .then(response => response.json())
          .then(data => console.log(data))

          window.location.href = "./booking.html"
        });
      });
    }
  });
