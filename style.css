* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    overflow: hidden;
    position: relative;
}

body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
        radial-gradient(circle at 20% 80%, rgba(120,119,198,0.4) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(120,219,255,0.2) 0%, transparent 50%);
    pointer-events: none;
    z-index: 1;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
    gap: 2rem;
    position: relative;
    z-index: 2;
}

.quote {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 300;
    color: rgba(255, 255, 255, 0.95);
    line-height: 1.3;
    text-align: center;
    max-width: 700px;
    opacity: 0;
    transform: translateY(40px);
    animation: fadeInUp 1.2s cubic-bezier(0.23, 1, 0.320, 1) forwards;
    text-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.author {
    font-size: clamp(1.1rem, 2.5vw, 1.6rem);
    color: rgba(255,255,255,0.85);
    font-style: italic;
    font-weight: 400;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 1.2s cubic-bezier(0.23, 1, 0.320, 1) 0.4s forwards;
    text-shadow: 0 2px 10px rgba(0,0,0,0.2);
    margin-bottom: 3rem;
}

.btn {
    background: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%);
    border: 2px solid rgba(255,255,255,0.4);
    color: white;
    padding: 1.2rem 3rem;
    font-size: 1.15rem;
    font-weight: 500;
    border-radius: 50px;
    cursor: pointer;
    backdrop-filter: blur(20px);
    transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
    position: relative;
    overflow: hidden;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.btn:hover {
    background: linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.2) 100%);
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

.btn:active {
    transform: translateY(-2px);
}

/* Enhanced Glitter Effect - MUCH MORE VISIBLE */
.glitter {
    position: fixed;
    pointer-events: none;
    border-radius: 50%;
    z-index: 1000;
    box-shadow: 
        0 0 10px rgba(255,255,255,0.8),
        inset 0 0 10px rgba(255,255,255,0.4);
    animation: sparkle 0.8s ease-out forwards;
}

.glitter.big {
    width: 8px;
    height: 8px;
    background: radial-gradient(circle, #ffffff 20%, rgba(255,215,0,0.8) 60%, transparent 70%);
}

.glitter.medium {
    width: 6px;
    height: 6px;
    background: radial-gradient(circle, rgba(255,255,255,0.9) 30%, rgba(173,216,230,0.7) 70%, transparent 80%);
}

.glitter.small {
    width: 4px;
    height: 4px;
    background: radial-gradient(circle, rgba(255,255,255,1) 40%, rgba(255,192,203,0.8) 80%, transparent 90%);
}

/* Animations */
@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes sparkle {
    0% {
        transform: scale(0) rotate(0deg);
        opacity: 1;
    }
    50% {
        opacity: 0.8;
        transform: scale(1.2) rotate(90deg);
    }
    100% {
        transform: scale(0) rotate(180deg);
        opacity: 0;
    }
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

/* Responsive */
@media (max-width: 768px) {
    .container {
        gap: 1.5rem;
        padding: 1.5rem;
    }
    
    .quote {
        font-size: 2.2rem;
        line-height: 1.2;
    }
    
    .author {
        font-size: 1.3rem;
    }
}
