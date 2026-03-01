let artworks = [];
let index = 0;

const art = document.getElementById("art");
const title = document.getElementById("title");

async function loadArtworks() {
    const response = await fetch("data/artworks.json");
    artworks = await response.json();
    startGallery();
}

function startGallery() {
    showArtwork(index);
}

function showArtwork(i) {

    const piece = artworks[i];

    /* Reset instantly */
    art.style.transition = "none";
    art.style.backgroundImage = `url(${piece.file})`;

    art.style.transform =
        `translate(${piece.zoomStart.x}%, ${piece.zoomStart.y}%)
         scale(${piece.zoomStart.scale})`;

    /* Force browser repaint */
    art.offsetHeight;

    /* Start slow zoom */
    art.style.transition =
        `transform ${piece.duration}s linear`;

    art.style.transform =
        `translate(${piece.zoomEnd.x}%, ${piece.zoomEnd.y}%)
         scale(${piece.zoomEnd.scale})`;

    showTitle(piece.title);

    setTimeout(() => {
        transitionNext();
    }, piece.duration * 1000);
}

function showTitle(text) {

    title.textContent = text;
    title.style.opacity = 1;

    setTimeout(() => {
        title.style.opacity = 0;
    }, 6000);
}

function transitionNext() {

    art.style.opacity = 0;

    setTimeout(() => {

        index = (index + 1) % artworks.length;

        art.style.opacity = 1;

        showArtwork(index);

    }, 3000);
}

loadArtworks();
