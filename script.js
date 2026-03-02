let artworks = [];
let index = 0;

const art = document.getElementById("art");
const title = document.getElementById("title");

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

        /* random order on first load */
        shuffleArray(artworks);

        playArtwork(index);

    } catch (error) {
        console.error("Failed to load artworks:", error);
    }
}

/* Main artwork cycle */
function playArtwork(i) {

    const piece = artworks[i];

    const img = new Image();
    img.src = piece.file;

    img.onload = () => {

        /* reset instantly */
        art.style.transition = "none";
        art.style.backgroundImage = `url(${piece.file})`;
        art.style.transform = "scale(1)";
        art.style.opacity = 0;

        title.style.opacity = 0;

        /* force reflow */
        art.offsetHeight;

        /* fade in artwork */
        art.style.transition = "opacity 3s ease";
        art.style.opacity = 1;

        /* show title after fade */
        setTimeout(() => {
            showTitle(piece.title);
        }, 3000);

        /* start zoom */
        setTimeout(() => {
            art.style.transition =
                `transform ${piece.duration}s ease-in-out`;

            art.style.transform =
                `scale(${piece.zoomEnd.scale})`;

        }, 3500);

        /* schedule next artwork */
        setTimeout(() => {
            fadeOutAndNext();
        }, piece.duration * 1000 + 3500);
    };

    img.onerror = () => {
        console.error("Image failed to load:", piece.file);
        fadeOutAndNext();
    };
}

/* Title display */
function showTitle(text) {

    title.textContent = text;

    title.style.transition = "opacity 2s ease";
    title.style.opacity = 1;

    /* keep title visible longer */
    setTimeout(() => {
        title.style.opacity = 0;
    }, 10000);
}

/* Fade out and move to next artwork */
function fadeOutAndNext() {

    art.style.transition = "opacity 3s ease";
    art.style.opacity = 0;

    title.style.opacity = 0;

    setTimeout(() => {

        index++;

        /* after ALL artworks played once */
        if (index >= artworks.length) {
            shuffleArray(artworks);   // new exhibition order
            index = 0;
        }

        playArtwork(index);

    }, 3000);
}

/* Start museum */
loadArtworks();
