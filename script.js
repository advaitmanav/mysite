const quotes = [
    { text: "When uncreated light appears, there is nothing looking at it. It is present to itself. It is who we are.  We are not experiencing the state; we are the state.", author: "Robert" },
    { text: "The sequence is the second best plan. Uncreated Light is the best plan.", author: "Robert" },
    { text: "When you give with expectations in return, you are already lost", author: "Advait" },
    { text: "When you love something or someone with all your heart, there is no backup option.", author: "Advait 2024" },
];
const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const btn = document.getElementById('newQuote');
const timerPath = document.querySelector('.timer-path');
const btnText = document.querySelector('.btn-text');

let touchActive = false;
let timerInterval;
let timeLeft = 10;
let isTimerRunning = false;

// TIMER CIRCLE CONSTANTS
const CIRCUMFERENCE = 100;
timerPath.style.strokeDasharray = `${CIRCUMFERENCE} ${CIRCUMFERENCE}`;

// Glitter effect (unchanged)
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

// 10-SECOND TIMER LOGIC
function startTimer() {
    if (isTimerRunning) return;
    
    isTimerRunning = true;
    timeLeft = 10;
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerRing();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            autoChangeQuote();
        }
    }, 1000);
}

function updateTimerRing() {
    const progress = ((10 - timeLeft) / 10) * CIRCUMFERENCE;
    timerPath.style.strokeDashoffset = `${CIRCUMFERENCE - progress}`;
}

function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    timeLeft = 10;
    timerPath.style.strokeDashoffset = CIRCUMFERENCE;
}

function autoChangeQuote() {
    newQuote();
    // Auto restart timer after quote change
    setTimeout(startTimer, 500);
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
    
    btn.style.transform = 'scale(0.96)';
    setTimeout(() => btn.style.transform = 'scale(1)', 120);
}

// Button interactions - MANUAL OVERRIDE
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
        background: rgba(255,255,255,0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.5s linear;
        pointer-events: none;
        z-index: 10;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
}

// Touch/swipe + keyboard (manual override)
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

// START EVERYTHING
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        newQuote();
        setTimeout(startTimer, 500);
    }, 400);
});
