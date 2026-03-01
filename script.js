let artworks = [];
let index = 0;

const art = document.getElementById("art");
const title = document.getElementById("title");

/* Fisher-Yates Shuffle */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/* Load artworks */
async function loadArtworks() {
    const response = await fetch("data/artworks.json");
    artworks = await response.json();

    /* RANDOMIZE ORDER ON LOAD */
    shuffleArray(artworks);

    playArtwork(index);
}

/* Main artwork cycle */
function playArtwork(i) {

    const piece = artworks[i];

    const img = new Image();
    img.src = piece.file;

    img.onload = () => {

        /* Reset */
        art.style.transition = "none";
        art.style.backgroundImage = `url(${piece.file})`;
        art.style.transform = "scale(1)";
        art.style.opacity = 0;

        title.style.opacity = 0;

        art.offsetHeight;

        /* Fade in */
        art.style.transition = "opacity 3s ease";
        art.style.opacity = 1;

        /* Show title after fade */
        setTimeout(() => {
            showTitle(piece.title);
        }, 3000);

        /* Start zoom */
        setTimeout(() => {
            art.style.transition =
                `transform ${piece.duration}s ease-in-out`;

            art.style.transform =
                `scale(${piece.zoomEnd.scale})`;

        }, 3500);

        /* Schedule fade out */
        setTimeout(() => {
            fadeOutAndNext();
        }, piece.duration * 1000 + 3500);
    };
}

/* Title display */
function showTitle(text) {

    title.textContent = text;

    title.style.transition = "opacity 2s ease";
    title.style.opacity = 1;

    setTimeout(() => {
        title.style.opacity = 0;
    }, 10000);
}

/* Fade out and move next */
function fadeOutAndNext() {

    art.style.transition = "opacity 3s ease";
    art.style.opacity = 0;

    title.style.opacity = 0;

    setTimeout(() => {
        index = (index + 1) % artworks.length;
        playArtwork(index);
    }, 3000);
}

/* Start */
loadArtworks();
