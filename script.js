const quotes = [
    { text: "When uncreated light appears, there is nothing looking at it.", author: "Robert" },
    { text: "The sequence is the second best plan.", author: "Robert" },
    { text: "When you give with expectations in return, you are already lost", author: "Advait" },
    { text: "When you love something fully there is no backup", author: "Advait" }
]

const quoteEl = document.getElementById('quote')
const authorEl = document.getElementById('author')
const btn = document.getElementById('newQuote')
const timerProgress = document.querySelector('.timer-progress')
const sparkDot = document.querySelector('.spark-dot')

let timer
let timeLeft = 10
let angle = -90
const R = 44
const C = 276.46

function newQuote() {
    const q = quotes[Math.floor(Math.random() * quotes.length)]
    quoteEl.textContent = `"${q.text}"`
    authorEl.textContent = q.author
}

function spawnTrail(x, y) {
    const t = document.createElement('div')
    t.className = 'trail'
    t.style.left = x + 'px'
    t.style.top = y + 'px'
    document.body.appendChild(t)
    setTimeout(() => t.remove(), 600)
}

function startTimer() {
    clearInterval(timer)
    timeLeft = 10
    angle = -90
    timerProgress.style.strokeDashoffset = C

    timer = setInterval(() => {
        timeLeft--
        const progress = (10 - timeLeft) / 10
        timerProgress.style.strokeDashoffset = C * (1 - progress)

        angle -= 36
        sparkDot.style.transform = `rotate(${angle}deg) translate(0,-44px)`

        const rect = btn.getBoundingClientRect()
        const rad = (angle + 90) * Math.PI / 180
        const x = rect.left + rect.width/2 + Math.cos(rad) * (rect.width/2)
        const y = rect.top + rect.height/2 + Math.sin(rad) * (rect.height/2)
        spawnTrail(x, y)

        if (timeLeft <= 0) {
            clearInterval(timer)
            btn.click()
        }
    }, 1000)
}

btn.addEventListener('click', () => {
    newQuote()
    startTimer()
})

document.addEventListener('DOMContentLoaded', () => {
    newQuote()
    startTimer()
})
