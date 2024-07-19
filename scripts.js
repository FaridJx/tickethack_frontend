document.querySelector('#btn-search').addEventListener('click', () => {
    const tripDepart = document.querySelector('#depart').value;
    const tripArrivee = document.querySelector('#arrivée').value;

    const tripDate = document.querySelector('#date');
    const dateValue = tripDate.value
    console.log(dateValue);


 fetch('http://localhost:3000/trips')
    .then(response => response.json())
    .then(data => {
        const filteredTrips = data.trips.filter(trip => trip.departure === tripDepart && trip.arrival === tripArrivee && trip.date === dateValue);

        if (filteredTrips.length > 0) {
            const resultElement = document.querySelector('#result');
            resultElement.innerHTML = ''; // Efface le contenu précédent

            filteredTrips.forEach(trip => {
                resultElement.innerHTML += `
                    <div class="trip">
                        <p class="depart">${trip.departure}</p>
                        <p class="arrivée">${trip.arrival}</p>
                        <p class="price">${trip.price}</p>
                        <button class="book" id="btn-book">BOOK</button>
                    </div>
                `;
            });
        } else {
            document.querySelector('#result').innerHTML = `
                <img id="loupe" src="/images/notfound.png">
                <p>Ce trajet n'est pas disponible</p>
            `;
        }
    })
})
