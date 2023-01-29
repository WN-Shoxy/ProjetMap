let map = L.map('map').setView([50.6360346855851, 3.0652655678261236], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let url = 'https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=ensemble-des-lieux-de-restauration-des-crous&q=&rows=20&facet=type&facet=zone';
let afficherBandeau = document.querySelector('.bandeau-info');

fetch(url) 
    .then((res) => res.json())
    .then((res) => {
        const lieux = res.records;

        for (let lieu of lieux) {
            let marker = L.marker(lieu.fields.geolocalisation).addTo(map);
            marker.addEventListener('click', bandeauInfo);

            function bandeauInfo() {
                afficherBandeau.innerHTML =`
                <div class="bandeau-info">
                    <div class="image-resto">
                    <img src="img/default.jpg" alt="">
                    </div>
                    <div class="description">
                    <h2>${lieu.fields.title}</h2>
                    <p>${lieu.fields.contact}</p>
                    <p>${lieu.fields.infos}</p>
                    </div>
                    <div class="btns">
                        <button class="btn" id="save">Enregistrer</button>
                        <i id="croix" class="fas fa-times"></i>
                    </div>
                </div>`;
                afficherBandeau.onclick = (event) => {
                    let target = event.target;
                    if (target.id === "croix") {
                        target.parentElement.parentElement.remove();
                    } else if (target.id === "save") {
                        const Liste = 'favoris';
                        const favString = localStorage.getItem(Liste);
                        const favoris = JSON.parse(favString) || [];
                        let titre = lieu.fields.title;
                        let contact = lieu.fields.contact;
                        let infos = lieu.fields.short_desc;
                        const newFavoris = { titre, contact, infos };
                        
                        favoris.push(newFavoris);
                        
                        localStorage.setItem(Liste, JSON.stringify(favoris));
                    }
                }
            }

        }
}   )
