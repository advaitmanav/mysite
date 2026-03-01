let artworks = [];
let index = 0;

const art = document.getElementById("art");
const title = document.getElementById("title");

async function loadArtworks() {
    const response = await fetch("data/artworks.json");
    artworks = await response.json();
    showArtwork(index);
}

function showArtwork(i) {

    const piece = artworks[i];

    /* Load image first */
    const img = new Image();
    img.src = piece.file;

    img.onload = () => {

        /* Set artwork */
        art.style.transition = "none";
        art.style.backgroundImage = `url(${piece.file})`;

        /* Start fully visible */
        art.style.transform = "scale(1)";
        art.style.opacity = 0;

        /* Force repaint */
        art.offsetHeight;

        /* Fade in */
        art.style.transition = "opacity 3s ease";
        art.style.opacity = 1;

        showTitle(piece.title);

        /* Wait before zoom starts */
        setTimeout(() => {

            art.style.transition =
                `transform ${piece.duration}s linear`;

            art.style.transform =
                `translate(${piece.zoomEnd.x}%, ${piece.zoomEnd.y}%)
                 scale(${piece.zoomEnd.scale})`;

        }, 2500);  // delay before zoom

        /* Move to next artwork */
        setTimeout(transitionNext,
            piece.duration * 1000 + 2500);
    };
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
        showArtwork(index);
    }, 3000);
}

loadArtworks();
