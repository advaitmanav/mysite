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
let autoInterval;
let ringTimer;
let orbitTimer;
let touchActive = false;

const circumference = 2 * Math.PI * 22;
ring.style.strokeDasharray = circumference;
ring.style.strokeDashoffset = circumference;

/* ALWAYS ON CURSOR GLITTER */

document.addEventListener('mousemove', throttle((e) => {
    if (!touchActive) createGlitterTrail(e.clientX, e.clientY);
}, 20));

document.addEventListener('touchmove', throttle((e) => {
    touchActive = true;
    const t = e.touches[0];
    createGlitterTrail(t.clientX, t.clientY);
}, 30));

document.addEventListener('touchend', () => touchActive = false);

function createGlitterTrail(x, y) {
    createGlitter(x, y, 'big');
    for (let i = 0; i < Math.random() * 3 + 3; i++) {
        setTimeout(() => {
            const ox = (Math.random() - 0.5) * 50;
            const oy = (Math.random() - 0.5) * 50;
            createGlitter(x + ox, y + oy, Math.random() > 0.4 ? 'medium' : 'small');
        }, i * 40);
    }
}

function createGlitter(x, y, size) {
    const g = document.createElement('div');
    g.className = `glitter ${size}`;
    g.style.left = x + 'px';
    g.style.top = y + 'px';
    document.body.appendChild(g);
    setTimeout(() => g.remove(), 700);
}

function throttle(fn, limit) {
    let wait = false;
    return function () {
        if (!wait) {
            fn.apply(this, arguments);
            wait = true;
            setTimeout(() => wait = false, limit);
        }
    };
}

/* ORBIT GLITTER */

function startOrbit() {
    stopOrbit();
    const wrap = document.querySelector('.auto-wrap');
    let angle = 0;

    orbitTimer = setInterval(() => {
        angle -= 8;
        const r = 26;
        const rect = wrap.getBoundingClientRect();
        const cx = rect.left + 26;
        const cy = rect.top + 26;
        const x = cx + r * Math.cos(angle * Math.PI / 180);
        const y = cy + r * Math.sin(angle * Math.PI / 180);
        createGlitter(x, y, Math.random() > 0.5 ? 'medium' : 'small');
    }, 80);
}

function stopOrbit() {
    clearInterval(orbitTimer);
}

/* QUOTES */

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
    }, 300);

    if (autoMode) startRing();
}

btn.addEventListener('click', (e) => {
    e.preventDefault();
    newQuote();
    createRipple(e);
});

function createRipple(e) {
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255,255,255,0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.5s linear;
        pointer-events: none;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
}

/* THEME */

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('night');
    themeToggle.textContent = document.body.classList.contains('night') ? '☀️' : '🌙';
});

/* AUTO */

autoToggle.addEventListener('click', () => {
    autoMode = !autoMode;
    autoToggle.classList.toggle('active', autoMode);

    if (autoMode) {
        newQuote();
        startRing();
        startOrbit();
        autoInterval = setInterval(newQuote, 20000);
    } else {
        clearInterval(autoInterval);
        stopRing();
        stopOrbit();
    }
});

/* RING */

function startRing() {
    clearInterval(ringTimer);
    const start = Date.now();
    ringTimer = setInterval(() => {
        const p = (Date.now() - start) / 20000;
        ring.style.strokeDashoffset = circumference * (1 - p);
        if (p >= 1) ring.style.strokeDashoffset = circumference;
    }, 50);
}

function stopRing() {
    clearInterval(ringTimer);
    ring.style.strokeDashoffset = circumference;
}

setTimeout(newQuote, 400);
