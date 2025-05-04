let carts

document.querySelector('#btn-search').addEventListener('click', () => {
    const tripDepart = document.querySelector('#depart').value;
    const tripArrivee = document.querySelector('#arrivee').value;
    
    const tripDate = new Date(document.querySelector('#date').value);

    
    let resultElement = document.querySelector('#result');
    // console.log(typeof tripDate);
    
    fetch('http://localhost:3000/trips/selec',{
        headers: {
            "Content-Type" : "application/json"
        },
        method: 'POST',
        body: JSON.stringify({
            departure: tripDepart,
            arrival: tripArrivee,
            date: tripDate
        })
    })
    .then(response => response.json())
    .then(data => {
        // let formatDate = `${data.trips.date.getFullYear()}-${dateValue.getMonth}-${dateValue.getDay}`
        console.log(data);
        
        // const filteredTrips = data.trips.filter(trip => trip.departure === tripDepart && trip.arrival === tripArrivee && trip.date === dateValue);

        if (data.data?.length) {
            resultElement.innerHTML = ''; // Efface le contenu précédent

            data.data.forEach(trip => {
                let dates = new Date(trip.date)
                let hours = dates.getHours()
                let minutes = dates.getMinutes()
                if(minutes < 10){
                    minutes = '0'+minutes
                }
                if(hours < 10){
                    hours = '0'+hours
                }
                resultElement.innerHTML += `
                    <div class="trip">
                        <div class="dep-arr">
                        <p class="depart">${trip.departure}</p>
                        <p class="space">></p>
                        <p class="arrivée">${trip.arrival}</p>
                        </div>
                        <p class="price">${trip.price}€</p>
                        <p class="hours">${hours}:${minutes}</p>
                        <button class="book" 
                                id="btn-book"
                                data-depart="${trip.departure}"
                                data-arrivee="${trip.arrival}"
                                data-price="${trip.price}"
                                data-date="${dates}"
                                data-hours="${hours}:${minutes}">
                                    BOOK
                        </button>
                    </div>
                `;
            });
            carts = document.querySelectorAll('.book')
            carts?.forEach(e => {
                e.addEventListener('click', () => {
                    const depart = e.dataset.depart
                    const arrivee = e.dataset.arrivee
                    const date = e.dataset.date
                    const price = Number(e.dataset.price)
                    const hours = e.dataset.hours
                    
                    
                    fetch('http://localhost:3000/cart/new', {
                        headers: {
                            "Content-Type" : "application/json"
                        },
                        method: 'POST',
                        body: JSON.stringify({
                            departure: depart,
                            arrival: arrivee,
                            date: date,
                            price: price
                        })
                    }).then(response => response.json())
                    .then(data => console.log(data)
                )
            }
        )
        })
        } else{
            resultElement.innerHTML = '';
            resultElement.innerHTML += `
                <div id="resultContain">
                    <img id="loupe" src="/images/notfound.png" height="140" width="140">
                    <hr>
                    <p>Ce trajet n'est pas disponible</p>
                </div>
            `;
        }
    })
})


