let artworks = [];
let index = 0;

const art = document.getElementById("art");
const title = document.getElementById("title");

/* Shuffle artworks each visit */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/* Preload next artwork */
function preloadNext() {
    const nextIndex = (index + 1) % artworks.length;
    const img = new Image();
    img.src = artworks[nextIndex].file;
}

/* Load artworks */
async function loadArtworks() {
    const response = await fetch("data/artworks.json");
    artworks = await response.json();

    shuffleArray(artworks);

    playArtwork(index);
}

/* Main artwork cycle */
function playArtwork(i) {

    const piece = artworks[i];
    const zoomLevel = piece.zoom || 1.2;

    const img = new Image();
    img.src = piece.file;

    img.onload = () => {

        art.style.transition = "none";
        art.style.backgroundImage = `url(${piece.file})`;
        art.style.transform = "scale(1)";
        art.style.opacity = 0;

        title.style.opacity = 0;

        art.offsetHeight;

        /* Fade in */
        art.style.transition = "opacity 3s ease";
        art.style.opacity = 1;

        /* Title after fade in */
        setTimeout(() => {
            showTitle(piece.title);
        }, 3000);

        /* Start zoom */
        setTimeout(() => {
            art.style.transition =
                `transform ${piece.duration}s ease-in-out`;
            art.style.transform = `scale(${zoomLevel})`;
        }, 3500);

        preloadNext();

        /* Schedule fade out */
        setTimeout(() => {
            fadeOutAndNext();
        }, piece.duration * 1000 + 3500);
    };
}

/* Title display */
function showTitle(text) {

    title.textContent = text;
    title.style.opacity = 1;

    setTimeout(() => {
        title.style.opacity = 0;
    }, 10000);
}

/* Transition to next artwork */
function fadeOutAndNext() {

    art.style.opacity = 0;
    title.style.opacity = 0;

    setTimeout(() => {
        index = (index + 1) % artworks.length;
        playArtwork(index);
    }, 3000);
}

/* Start gallery */
loadArtworks();
