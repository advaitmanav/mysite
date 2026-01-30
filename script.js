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
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteEl.textContent = quotes[randomIndex];
    quoteEl.classList.add("show");
  }, 200);
}

btn.addEventListener("click", showRandomQuote);

// show one immediately
showRandomQuote();

// cursor follow
window.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});
