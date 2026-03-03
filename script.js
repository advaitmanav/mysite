let artworks = [];
let index = 0;

const art = document.getElementById("art");
const title = document.getElementById("title");

let timers = [];
let playSession = 0;   // prevents mismatch

/* clear timers */
function clearTimers() {
    timers.forEach(t => clearTimeout(t));
    timers = [];
}

/* shuffle */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/* load artworks */
async function loadArtworks() {
    try {
        const response = await fetch("data/artworks.json");
        artworks = await response.json();

        shuffleArray(artworks);
        playArtwork(index);

    } catch (e) {
        console.error("Artwork loading failed:", e);
    }
}

/* play artwork */
function playArtwork(i) {

    clearTimers();

    playSession++;              // NEW SESSION
    const session = playSession;

    const piece = artworks[i];

    const img = new Image();
    img.src = piece.file;

    img.onload = () => {

        /* ignore outdated loads */
        if (session !== playSession) return;

        art.style.transition = "none";
        art.style.backgroundImage = `url(${piece.file})`;
        art.style.transform = "scale(1)";
        art.style.opacity = 0;

        title.style.opacity = 0;

        art.offsetHeight;

        /* fade in */
        art.style.transition = "opacity 3s ease";
        art.style.opacity = 1;

        timers.push(setTimeout(() => {
            if (session !== playSession) return;
            showTitle(piece.title);
        }, 3000));

        /* zoom */
        timers.push(setTimeout(() => {
            if (session !== playSession) return;

            art.style.transition =
                `transform ${piece.duration}s ease-in-out`;

            art.style.transform =
                `scale(${piece.zoomEnd.scale})`;

        }, 3500));

        /* next artwork */
        timers.push(setTimeout(() => {
            if (session !== playSession) return;
            fadeOutAndNext();
        }, piece.duration * 1000 + 3500));
    };

    img.onerror = () => {
        fadeOutAndNext();
    };
}

/* title */
function showTitle(text) {

    title.textContent = text;
    title.style.transition = "opacity 2s ease";
    title.style.opacity = 1;

    timers.push(setTimeout(() => {
        title.style.opacity = 0;
    }, 10000));
}

/* next */
function fadeOutAndNext() {

    art.style.transition = "opacity 3s ease";
    art.style.opacity = 0;
    title.style.opacity = 0;

    timers.push(setTimeout(() => {

        index++;

        if (index >= artworks.length) {
            shuffleArray(artworks);
            index = 0;
        }

        playArtwork(index);

    }, 3000));
}

/* start */
loadArtworks();
