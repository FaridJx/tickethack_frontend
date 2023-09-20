document.querySelector('#btn-search').addEventListener('click', () => {
	const tripDepart = document.querySelector('#depart').value;
    const tripArrivee = document.querySelector('#arrivée').value;

fetch('http://localhost:3000/trips/selec', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ tripDepart , tripArrivee }),
	}).then(response => response.json())
    .then(data => {
		if (data.trip) {
			for (let i = 0; i < data.trip.length; i++) {
				document.querySelector('#result').innerHTML = `
				<div class="trip">
				<p class="depart">${data.trip[i].departure}</p>
				<p class="arrivée">${data.trip[i].arrival}</p>
                <p class="price">${data.trip[i].price}</p>

				<button class="book" id="btn-book">BOOK</button>
			</div>
			`;
			}}
            else {
         document.querySelector('#result').innerHTML =`
            <div class="notfound">
            <img id="train" src="images/train.png" />
            <p class="message">No Trip Found</p>`
        
        }
    
})
})