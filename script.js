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
const quotes = [
    { text: "The Beloved longs to see me, and I long even more to see Him.", author: "Ibn Arabi" },
    { text: "Presence is the one we call the Beloved.", author: "Rumi" },
    { text: "For that which sees is itself and the thing which is seen.", author: "Plotinus" },
    { text: "When uncreated light appears, there is nothing looking at it.", author: "R.B" },
    { text: "When efforts are given with love, it becomes blossoming.", author: "Advait" }
];

const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const btn = document.getElementById('newQuote');
const themeToggle = document.getElementById('themeToggle');
const autoToggle = document.getElementById('autoToggle');
const ring = document.querySelector('.ring circle');

let lastQuoteIndex = -1;
let autoMode = false;
let autoInterval;
let ringTimer;
let orbitTimer;
let touchActive = false;

const circumference = 2 * Math.PI * 22;
ring.style.strokeDasharray = circumference;
ring.style.strokeDashoffset = circumference;

/* fade quote change */

function newQuote() {
    let i;
    do { i = Math.floor(Math.random() * quotes.length); }
    while (i === lastQuoteIndex);
    lastQuoteIndex = i;

    quoteEl.style.opacity = 0;
    authorEl.style.opacity = 0;

    setTimeout(() => {
        quoteEl.textContent = `"${quotes[i].text}"`;
        authorEl.textContent = quotes[i].author;
        quoteEl.style.opacity = 1;
        authorEl.style.opacity = 1;
    }, 1000); // 1s fade out + 1s fade in = ~2s

    if (autoMode) startRing();
}

btn.addEventListener('click', newQuote);

/* rest of your script remains EXACTLY the same */
}

setTimeout(newQuote, 400);
