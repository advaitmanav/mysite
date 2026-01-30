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

const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const btn = document.getElementById('newQuote');
let touchActive = false;
let timerInterval;
let timeLeft = 10;
let isTimerRunning = false;

// Glitter effect
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

// Pure CSS 10s rotating border timer
function startTimer() {
    if (isTimerRunning) return;
    
    isTimerRunning = true;
    timeLeft = 10;
    btn.classList.remove('timer-complete', 'timer-progress');
    btn.classList.add('timer-progress');
    
    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            triggerAutoClick();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    timeLeft = 10;
    btn.classList.remove('timer-complete', 'timer-progress');
}

function triggerAutoClick() {
    btn.classList.remove('timer-progress');
    btn.classList.add('timer-complete');
    setTimeout(() => {
        newQuote();
        setTimeout(startTimer, 300);
    }, 500);
}

function newQuote() {
    resetTimer();
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    quoteEl.style.animation = 'none';
    authorEl.style.animation = 'none';
    
    quoteEl.textContent = `"${randomQuote.text}"`;
    authorEl.textContent = `- ${randomQuote.author}`;
    
    quoteEl.offsetHeight;
    authorEl.offsetHeight;
    
    quoteEl.style.animation = 'fadeInUp 1.2s cubic-bezier(0.23, 1, 0.320, 1) forwards';
    authorEl.style.animation = 'fadeInUp 1.2s cubic-bezier(0.23, 1, 0.320, 1) 0.4s forwards';
}

// Manual interactions
btn.addEventListener('click', (e) => {
    e.preventDefault();
    resetTimer();
    newQuote();
    createRipple(e);
});

btn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    resetTimer();
    newQuote();
    createRipple(e.changedTouches[0]);
});

function createRipple(e) {
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = (e.clientX || e.touches[0].clientX) - rect.left - size / 2;
    const y = (e.clientY || e.touches[0].clientY) - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255,215,0,0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.5s linear;
        pointer-events: none;
        z-index: 10;
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
    const diffX = Math.abs(startX - endX);
    const diffY = Math.abs(startY - endY);
    if (diffX > 50 || diffY > 50) {
        resetTimer();
        newQuote();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        resetTimer();
        newQuote();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        newQuote();
        setTimeout(startTimer, 500);
    }, 400);
});
