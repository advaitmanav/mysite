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

let lastQuoteIndex = -1;
let touchActive = false;

/* glitter trail */
document.addEventListener('mousemove', throttle((e) => {
    if (!touchActive) createGlitterTrail(e.clientX, e.clientY);
}, 20));

document.addEventListener('touchmove', throttle((e) => {
    touchActive = true;
    const touch = e.touches[0];
    createGlitterTrail(touch.clientX, touch.clientY);
}, 30));

document.addEventListener('touchend', () => touchActive = false);

function createGlitterTrail(x, y) {
    createGlitter(x, y, 'big');
    for (let i = 0; i < Math.random() * 3 + 3; i++) {
        setTimeout(() => {
            const offsetX = (Math.random() - 0.5) * 50;
            const offsetY = (Math.random() - 0.5) * 50;
            createGlitter(x + offsetX, y + offsetY, Math.random() > 0.4 ? 'medium' : 'small');
        }, i * 40);
    }
}

function createGlitter(x, y, sizeClass = 'medium') {
    const glitter = document.createElement('div');
    glitter.className = `glitter ${sizeClass}`;
    glitter.style.left = x + 'px';
    glitter.style.top = y + 'px';
    document.body.appendChild(glitter);
    setTimeout(() => glitter.remove(), 700);
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        if (!inThrottle) {
            func.apply(this, arguments);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

/* non repeating random quote */
function newQuote() {
    let index;
    do {
        index = Math.floor(Math.random() * quotes.length);
    } while (index === lastQuoteIndex);

    lastQuoteIndex = index;
    const randomQuote = quotes[index];

    quoteEl.style.animation = 'none';
    authorEl.style.animation = 'none';

    quoteEl.textContent = `"${randomQuote.text}"`;
    authorEl.textContent = randomQuote.author;

    quoteEl.offsetHeight;
    authorEl.offsetHeight;

    quoteEl.style.animation = 'fadeInUp 1.2s cubic-bezier(0.23, 1, 0.320, 1) forwards';
    authorEl.style.animation = 'fadeInUp 1.2s cubic-bezier(0.23, 1, 0.320, 1) 0.4s forwards';

    btn.style.transform = 'scale(0.96)';
    setTimeout(() => btn.style.transform = 'scale(1)', 120);
}

/* button */
btn.addEventListener('click', (e) => {
    e.preventDefault();
    newQuote();
    createRipple(e);
});

btn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    newQuote();
    createRipple(e.changedTouches[0]);
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

/* keyboard */
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        newQuote();
    }
});

/* init */
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => newQuote(), 400);
});

/* theme toggle */
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('night');
    themeToggle.textContent = document.body.classList.contains('night') ? '☀️' : '🌙';
});
