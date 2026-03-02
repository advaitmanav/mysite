let artworks = [];
let index = 0;

const art = document.getElementById("art");
const title = document.getElementById("title");

/* store active timers */
let timers = [];

/* helper to clear timers */
function clearTimers() {
    timers.forEach(t => clearTimeout(t));
    timers = [];
}

/* Fisher Yates Shuffle */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/* Load artworks */
async function loadArtworks() {
    try {
        const response = await fetch("data/artworks.json");
        artworks = await response.json();

        shuffleArray(artworks);
        playArtwork(index);

    } catch (error) {
        console.error("Failed to load artworks:", error);
    }
}

/* Main artwork cycle */
function playArtwork(i) {

    clearTimers();   /* IMPORTANT FIX */

    const piece = artworks[i];

    const img = new Image();
    img.src = piece.file;

    img.onload = () => {

        /* reset */
        art.style.transition = "none";
        art.style.backgroundImage = `url(${piece.file})`;
        art.style.transform = "scale(1)";
        art.style.opacity = 0;

        title.style.opacity = 0;

        art.offsetHeight;

        /* fade in artwork */
        art.style.transition = "opacity 3s ease";
        art.style.opacity = 1;

        /* show title */
        timers.push(setTimeout(() => {
            showTitle(piece.title);
        }, 3000));

        /* zoom animation */
        timers.push(setTimeout(() => {
            art.style.transition =
                `transform ${piece.duration}s ease-in-out`;

            art.style.transform =
                `scale(${piece.zoomEnd.scale})`;

        }, 3500));

        /* schedule next */
        timers.push(setTimeout(() => {
            fadeOutAndNext();
        }, piece.duration * 1000 + 3500));
    };

    img.onerror = () => {
        console.error("Image failed:", piece.file);
        fadeOutAndNext();
    };
}

/* Title display */
function showTitle(text) {

    title.textContent = text;

    title.style.transition = "opacity 2s ease";
    title.style.opacity = 1;

    timers.push(setTimeout(() => {
        title.style.opacity = 0;
    }, 10000));
}

/* Move to next artwork */
function fadeOutAndNext() {

    art.style.transition = "opacity 3s ease";
    art.style.opacity = 0;

    title.style.opacity = 0;

    timers.push(setTimeout(() => {

        index++;

        /* reshuffle after full cycle */
        if (index >= artworks.length) {
            shuffleArray(artworks);
            index = 0;
        }

        playArtwork(index);

    }, 3000));
}

/* Start */
loadArtworks();
