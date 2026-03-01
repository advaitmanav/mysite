let artworks = [];
let index = 0;

const art = document.getElementById("art");
const title = document.getElementById("title");

async function loadArtworks() {
    const response = await fetch("data/artworks.json");
    artworks = await response.json();
    playArtwork(index);
}

function playArtwork(i) {

    const piece = artworks[i];

    const img = new Image();
    img.src = piece.file;

    img.onload = () => {

        /* Reset instantly */
        art.style.transition = "none";
        art.style.backgroundImage = `url(${piece.file})`;
        art.style.transform = "scale(1)";
        art.style.opacity = 0;

        title.style.opacity = 0;

        art.offsetHeight; // repaint trigger

        /* FADE IN */
        art.style.transition = "opacity 3s ease";
        art.style.opacity = 1;

        /* Show title AFTER fade in */
        setTimeout(() => {
            showTitle(piece.title);
        }, 3000);

        /* START ZOOM AFTER VIEWING MOMENT */
        setTimeout(() => {

            art.style.transition =
                `transform ${piece.duration}s ease-in-out`;

            art.style.transform =
                `scale(${piece.zoomEnd.scale})`;

        }, 3500);

        /* START FADE OUT */
        setTimeout(() => {
            fadeOutAndNext();
        }, piece.duration * 1000 + 3500);
    };
}

function showTitle(text) {

    title.textContent = text;

    title.style.transition = "opacity 2s ease";
    title.style.opacity = 1;

    setTimeout(() => {
        title.style.opacity = 0;
    }, 5000);
}

function fadeOutAndNext() {

    art.style.transition = "opacity 3s ease";
    art.style.opacity = 0;

    title.style.opacity = 0;

    setTimeout(() => {
        index = (index + 1) % artworks.length;
        playArtwork(index);
    }, 3000);
}

loadArtworks();
