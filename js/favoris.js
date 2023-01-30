let afficherBandeau = document.querySelector('.bandeau-info');
let infoRecup = JSON.parse(localStorage.getItem('favoris'));

function saveInfo() {
    for (i = 0; i < infoRecup.length; i++) {
        afficherBandeau.innerHTML +=`
        <div class="bandeau-info">
            <div class="image-resto">
            <img src="../img/default.jpg" alt="">
            </div>
            <div class="description">
            <h2>${infoRecup[i].titre}</h2>
            <p>${infoRecup[i].contact}</p>
            <p>${infoRecup[i].infos}</p>
            </div>
            <div class="btns">
                <i id="croix" class="fas fa-times"></i>
            </div>
        </div>`;
    }
}

afficherBandeau.onclick = (event) => {
    let target = event.target;
    if (target.id === "croix") {
        localStorage.clear();
    }
}

saveInfo();