// 1. The Quote Database
const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "Happiness depends upon ourselves.", author: "Aristotle" },
    { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
    { text: "Do not let what you cannot do interfere with what you can do.", author: "John Wooden" },
    { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
    { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" }
];

// 2. DOM Elements
const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const btn = document.getElementById('generate-btn');
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

// 3. Logic to get a quote
function generateQuote(isInitialLoad = false) {
    // Pick a random quote
    const random = Math.floor(Math.random() * quotes.length);
    const quote = quotes[random];

    if (isInitialLoad) {
        // If it's the first visit, display immediately without fade-out
        quoteEl.textContent = `"${quote.text}"`;
        authorEl.textContent = `- ${quote.author}`;
    } else {
        // If clicking button, do the fade animation
        quoteEl.classList.add('hide');
        authorEl.classList.add('hide');

        setTimeout(() => {
            quoteEl.textContent = `"${quote.text}"`;
            authorEl.textContent = `- ${quote.author}`;
            
            quoteEl.classList.remove('hide');
            authorEl.classList.remove('hide');
        }, 500); // Matches CSS transition time
    }
}

// 4. Custom Cursor Logic
window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows cursor exactly
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with a smooth lag animation
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// 5. Event Listeners

// Trigger on Button Click
btn.addEventListener('click', () => generateQuote(false));

// Trigger Automatically on Page Load
generateQuote(true);
