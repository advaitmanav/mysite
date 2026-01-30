const quotes = [
    { text: "The Beloved longs to see me, and I long even more to see Him.", author: "Ibn Arabi" },
    { text: "The Lover and the Beloved met, and the Beloved said to the Lover, 'Sing to me only with thine eyes.'", author: "Ramon Llull" },
    { text: "Presence is the one we call the Beloved.", author: "Rumi" },
    { text: "When uncreated light appears, it is present to itself.", author: "R.B" },
    { text: "For that which sees is itself and the thing which is seen.", author: "Plotinus" },
    { text: "When you love something with all your heart, there is no backup option.", author: "Advait" }
];

const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const btn = document.getElementById('newQuote');
const ring = document.querySelector('.timer-ring circle');
const themeToggle = document.getElementById('themeToggle');

let lastQuoteIndex = -1;

const RADIUS = 72;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
ring.style.strokeDasharray = CIRCUMFERENCE;
ring.style.strokeDashoffset = CIRCUMFERENCE;

let timerInterval;
const DURATION = 20000;

function startTimer() {
    let start = Date.now();
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        let progress = (Date.now() - start) / DURATION;
        if (progress >= 1) {
            ring.style.strokeDashoffset = CIRCUMFERENCE;
            newQuote();
            startTimer();
            return;
        }
        ring.style.strokeDashoffset = CIRCUMFERENCE * (1 - progress);
    }, 30);
}

function newQuote() {
    let index;
    do {
        index = Math.floor(Math.random() * quotes.length);
    } while (index === lastQuoteIndex);

    lastQuoteIndex = index;
    const q = quotes[index];

    quoteEl.style.animation = 'none';
    authorEl.style.animation = 'none';

    quoteEl.textContent = `"${q.text}"`;
    authorEl.textContent = q.author;

    quoteEl.offsetHeight;
    authorEl.offsetHeight;

    quoteEl.style.animation = 'fadeInUp 1.2s forwards';
    authorEl.style.animation = 'fadeInUp 1.2s 0.4s forwards';
}

btn.addEventListener('click', () => {
    newQuote();
    startTimer();
});

document.addEventListener('DOMContentLoaded', () => {
    newQuote();
    startTimer();
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('night');
    themeToggle.textContent = document.body.classList.contains('night') ? '☀️' : '🌙';
});
