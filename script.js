const quotes = [
  "Stay hungry. Stay foolish.",
  "Simplicity is the ultimate sophistication.",
  "Dream big. Start small.",
  "Code. Create. Repeat.",
  "Your future is created by what you do today."
];

const quoteEl = document.getElementById("quote");
const btn = document.getElementById("newQuote");
const cursor = document.querySelector(".cursor");

function showRandomQuote() {
  quoteEl.classList.remove("show");

  setTimeout(() => {
    const random = Math.floor(Math.random() * quotes.length);
    quoteEl.textContent = quotes[random];
    quoteEl.classList.add("show");
  }, 300);
}

btn.addEventListener("click", showRandomQuote);

// initial load
showRandomQuote();

// cursor animation
window.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});
