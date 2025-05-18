let bookingsContain = document.querySelector("#mainContain");

fetch("http://localhost:3000/booking")
  .then((response) => response.json())
  .then((data) => {
    if (data.length > 0) {
      bookingsContain.innerHTML = "";
      bookingsContain.innerHTML += `
        <div>
        <h3>My Travels</h3>
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
        // let dates = new Date(cart.date);
        let hours = cart.date.hour;
        let minutes = cart.date.min;
        let days = cart.date.day
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
            <p class="delete" 
            id="btn-delete"
            >
            ${cart.date.status} ${days} jours
            </p>
            </div>
            `;
      });
    }
  });
