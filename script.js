const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "- Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "- Steve Jobs" },
    { text: "Stay hungry. Stay foolish.", author: "- Steve Jobs" },
    { text: "Life is what happens to you while you're busy making other plans.", author: "- John Lennon" },
    { text: "In the middle of difficulty lies opportunity.", author: "- Albert Einstein" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "- Eleanor Roosevelt" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "- Confucius" },
    { text: "Everything you’ve ever wanted is on the other side of fear.", author: "- George Addair" },
    { text: "Your limitation—it's only your imagination.", author: "- Unknown" },
    { text: "Push yourself, because no one else is going to do it for you.", author: "- Unknown" },
    { text: "Great things never come from comfort zones.", author: "- Unknown" },
    { text: "Dream it. Wish it. Do it.", author: "- Unknown" },
    { text: "Success doesn't just find you. You have to go out and get it.", author: "- Unknown" },
    { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "- Unknown" },
    { text: "Dream bigger. Do bigger.", author: "- Unknown" }
];

const quoteEl = document.getElementById('quote');
const authorEl = document.querySelector('.author');
const btn = document.getElementById('newQuote');
const container = document.querySelector('.quote-container');

// Glitter cursor effect
document.addEventListener('mousemove', (e) => {
    createGlitter(e.clientX, e.clientY);
});

function createGlitter(x, y) {
    const glitter = document.createElement('div');
    glitter.className = 'glitter';
    glitter.style.left = x + 'px';
    glitter.style.top = y + 'px';
    
    // Random size and slight offset for natural effect
    const size = Math.random() * 3 + 2;
    glitter.style.width = size + 'px';
    glitter.style.height = size + 'px';
    
    document.body.appendChild(glitter);
    
    // Remove after animation
    setTimeout(() => {
        glitter.remove();
    }, 600);
}

// New quote function
function newQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    // Reset animations
    quoteEl.style.animation = 'none';
    authorEl.style.animation = 'none';
    container.style.transform = 'translateY(0)';
    
    // Update content
    quoteEl.textContent = randomQuote.text;
    authorEl.textContent = randomQuote.author;
    
    // Force reflow
    quoteEl.offsetHeight;
    authorEl.offsetHeight;
    
    // Trigger new animations
    quoteEl.style.animation = 'fadeInUp 1s ease forwards';
    authorEl.style.animation = 'fadeInUp 1s ease 0.3s forwards';
    
    // Button animation
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 150);
}

// Button click with haptic feedback simulation
btn.addEventListener('click', (e) => {
    e.preventDefault();
    newQuote();
    
    // Ripple effect on button
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255,255,255,0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    btn.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// Initial load animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        newQuote();
    }, 500);
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        newQuote();
    }
});
