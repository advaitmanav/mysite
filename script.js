const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Stay hungry. Stay foolish.", author: "Steve Jobs" },
    { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
    { text: "Your limitation—it's only your imagination.", author: "Unknown" },
    { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
    { text: "Great things never come from comfort zones.", author: "Unknown" },
    { text: "Dream it. Wish it. Do it.", author: "Unknown" },
    { text: "Success doesn't just find you. You have to go out and get it.", author: "Unknown" },
    { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown" },
    { text: "Dream bigger. Do bigger.", author: "Unknown" }
];

// MINIMALISTIC GRADIENT PALETTES - Soft & Elegant
const gradientPresets = [
    { color1: '#a8edea', color2: '#fed6e3' }, // Mint Rose
    { color1: '#ffecd2', color2: '#fcb69f' }, // Peach Sunrise
    { color1: '#e0c3fc', color2: '#8ec5fc' }, // Lavender Sky
    { color1: '#d299c2', color2: '#fef9d7' }, // Rose Gold
    { color1: '#a1c4fd', color2: '#c2e9fb' }, // Ocean Breeze
    { color1: '#ff9a9e', color2: '#fecfef' }, // Blush Pink
    { color1: '#a8e6cf', color2: '#dcedc1' }, // Mint Lime
    { color1: '#ffecd2', color2: '#fcb69f' }, // Warm Peach
    { color1: '#e0c3fc', color2: '#8ec5fc' }, // Purple Blue
    { color1: '#d299c2', color2: '#fef9d7' }  // Soft Rose
];

const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const btn = document.getElementById('newQuote');

let currentGradientIndex = 0;

// DYNAMIC GRADIENT CHANGE
function changeBackgroundGradient() {
    currentGradientIndex = (currentGradientIndex + 1) % gradientPresets.length;
    const preset = gradientPresets[currentGradientIndex];
    
    document.body.style.setProperty('--color1', preset.color1);
    document.body.style.setProperty('--color2', preset.color2);
}

// MOBILE-OPTIMIZED Glitter effect
let touchActive = false;

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
    for(let i = 0; i < Math.random() * 3 + 3; i++) {
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
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// New quote with gradient change
function newQuote() {
    changeBackgroundGradient(); // NEW: Dynamic gradient!
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    quoteEl.style.animation = 'none';
    authorEl.style.animation = 'none';
    
    quoteEl.textContent = `"${randomQuote.text}"`;
    authorEl.textContent = `- ${randomQuote.author}`;
    
    quoteEl.offsetHeight;
    authorEl.offsetHeight;
    
    quoteEl.style.animation = 'fadeInUp 1.2s cubic-bezier(0.23, 1, 0.320, 1) forwards';
    authorEl.style.animation = 'fadeInUp 1.2s cubic-bezier(0.23, 1, 0.320, 1) 0.4s forwards';
    
    btn.style.transform = 'scale(0.96)';
    setTimeout(() => btn.style.transform = 'scale(1)', 120);
}

// Button interactions
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
        background: rgba(255,255,255,0.6);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.5s linear;
        pointer-events: none;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
}

// Swipe + keyboard
let startX, startY;
document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    if (!startX || !startY) return;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = startX - endX;
    const diffY = startY - endY;
    if (Math.abs(diffX) > 50 || Math.abs(diffY) > 50) {
        newQuote();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        newQuote();
    }
});

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => newQuote(), 400);
});
