const quotes = [
    { text: "The Beloved longs to see me, and I long even more to see Him.", author: "Ibn Arabi" },
    { text: "The Lover and the Beloved met, and the Beloved said to the Lover, 'Thou needest not to speak to me. Sing to me only with thine eyes, for they are words to my heart - that I may give thee that which thou dost ask.", author: "Ramon Llull" },
    { text: "Presence is the one we call the Beloved.", author: "Rumi" },
    { text: "When uncreated light appears, there is nothing looking at it. It is present to itself. It is who we are. We are not experiencing the state; we are the state.", author: "R.B" },
    { text: "For that which sees is itself and the thing which is seen.", author: "Plotinus" },
    { text: "You may try a hundred things, but only love can release you from your self. Unless your chest gets that burning feeling every time love is mentioned, you are not yet ready to conquer love.", author: "Rumi" },
    { text: "The sequence is the second best plan. Uncreated Light is the best plan.", author: "R.B." },
    { text: "When you love something or someone with all your heart, there is no backup option.", author: "Advait 2024" },
    { text: "When you give with expectations in return, you're already lost in the first place", author: "Advait 2025" },
    { text: "When efforts are spent for love, it will always be exhausting. When efforts are given with love, it forsure becomes blossoming.", author: "Advait 2026" }
];

const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const btn = document.getElementById('newQuote');
const themeToggle = document.getElementById('themeToggle');
const autoToggle = document.getElementById('autoToggle');
const ring = document.querySelector('.ring circle');

let lastQuoteIndex = -1;
let autoMode = false;
let autoInterval = null;
let ringTimer = null;

const circumference = 2 * Math.PI * 22;
ring.style.strokeDasharray = circumference;
ring.style.strokeDashoffset = circumference;

function startRing() {
    let start = Date.now();
    clearInterval(ringTimer);

    ringTimer = setInterval(() => {
        let progress = (Date.now() - start) / 20000;
        ring.style.strokeDashoffset = circumference * (1 - progress);
        if (progress >= 1) ring.style.strokeDashoffset = circumference;
    }, 50);
}

function stopRing() {
    clearInterval(ringTimer);
    ring.style.strokeDashoffset = circumference;
}

/* non repeating random quote */
function newQuote() {
    let index;
    do { index = Math.floor(Math.random() * quotes.length); }
    while (index === lastQuoteIndex);

    lastQuoteIndex = index;
    const q = quotes[index];

    quoteEl.style.animation = 'none';
    authorEl.style.animation = 'none';
    quoteEl.textContent = `"${q.text}"`;
    authorEl.textContent = q.author;

    quoteEl.offsetHeight;
    authorEl.offsetHeight;

    quoteEl.style.animation = 'fadeInUp 1.2s cubic-bezier(0.23, 1, 0.320, 1) forwards';
    authorEl.style.animation = 'fadeInUp 1.2s cubic-bezier(0.23, 1, 0.320, 1) 0.4s forwards';

    if (autoMode) startRing();
}

/* theme toggle */
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('night');
    themeToggle.textContent = document.body.classList.contains('night') ? '☀️' : '🌙';
});

/* auto toggle */
autoToggle.addEventListener('click', () => {
    autoMode = !autoMode;
    autoToggle.classList.toggle('active', autoMode);

    if (autoMode) {
        newQuote();
        startRing();
        autoInterval = setInterval(newQuote, 20000);
    } else {
        clearInterval(autoInterval);
        stopRing();
    }
});

/* init */
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => newQuote(), 400);
});
