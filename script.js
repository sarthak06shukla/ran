// DOM Elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionContainer = document.getElementById('questionContainer');
const successContainer = document.getElementById('successContainer');
const heartsContainer = document.getElementById('heartsContainer');

// Create floating hearts background
function createFloatingHearts() {
    const hearts = ['💕', '💖', '💗', '💓', '💝', '❤️', '💘', '💞'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heartsContainer.appendChild(heart);

        setTimeout(() => heart.remove(), 7000);
    }, 300);
}

createFloatingHearts();

// No button escape logic
let isButtonInitialized = false;
let buttonWidth = 120;
let buttonHeight = 50;

// Move the No button to a random position around CENTER of screen
function moveNoButton() {
    // Get viewport dimensions
    const viewWidth = document.documentElement.clientWidth;
    const viewHeight = document.documentElement.clientHeight;

    // First time: capture button dimensions and switch to fixed
    if (!isButtonInitialized) {
        const rect = noBtn.getBoundingClientRect();
        buttonWidth = rect.width;
        buttonHeight = rect.height;

        // Switch to fixed positioning
        noBtn.style.position = 'fixed';
        noBtn.style.width = buttonWidth + 'px';
        noBtn.style.height = buttonHeight + 'px';
        noBtn.style.margin = '0';

        isButtonInitialized = true;
    }

    // Calculate CENTER of screen
    const centerX = viewWidth / 2;
    const centerY = viewHeight / 2;

    // Define movement zone - stay within 200px of center
    const moveRadius = 200;

    // Generate random offset from center
    const randomAngle = Math.random() * 2 * Math.PI;
    const randomDistance = Math.random() * moveRadius;

    let newX = centerX + Math.cos(randomAngle) * randomDistance - buttonWidth / 2;
    let newY = centerY + Math.sin(randomAngle) * randomDistance - buttonHeight / 2;

    // Clamp to viewport bounds (just in case)
    const margin = 20;
    newX = Math.max(margin, Math.min(newX, viewWidth - buttonWidth - margin));
    newY = Math.max(margin, Math.min(newY, viewHeight - buttonHeight - margin));

    // Apply position
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.right = 'auto';
    noBtn.style.bottom = 'auto';
    noBtn.style.zIndex = '9999';
    noBtn.style.transition = 'left 0.15s ease-out, top 0.15s ease-out';
    noBtn.style.transform = 'none';
}

// Event listeners
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
}, { passive: false });

noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Yes button handler
yesBtn.addEventListener('click', () => {
    createCelebration();

    questionContainer.style.transition = 'opacity 0.5s ease-out';
    questionContainer.style.opacity = '0';
    noBtn.style.display = 'none';

    setTimeout(() => {
        questionContainer.classList.add('hidden');
        successContainer.classList.remove('hidden');
        successContainer.style.opacity = '0';

        requestAnimationFrame(() => {
            successContainer.style.transition = 'opacity 0.5s ease-in';
            successContainer.style.opacity = '1';
        });
    }, 500);
});

// Celebration effect
function createCelebration() {
    const celebrationHearts = ['💕', '💖', '💗', '💓', '💝', '❤️', '💘', '💞', '🥰', '😍', '✨', '🎉'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = celebrationHearts[Math.floor(Math.random() * celebrationHearts.length)];
            heart.style.left = (window.innerWidth / 2) + 'px';
            heart.style.top = (window.innerHeight / 2) + 'px';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.position = 'fixed';
            heart.style.zIndex = '1000';
            heart.style.animation = 'none';
            heart.style.opacity = '1';

            const angle = (Math.random() * 360) * (Math.PI / 180);
            const distance = Math.random() * 300 + 100;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;

            heart.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
                { transform: `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(1.5)`, opacity: 0 }
            ], { duration: 1500, easing: 'ease-out' });

            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1500);
        }, i * 30);
    }
}

// Window resize handler
window.addEventListener('resize', () => {
    if (!isButtonInitialized) return;

    const viewWidth = document.documentElement.clientWidth;
    const viewHeight = document.documentElement.clientHeight;
    const margin = 20;

    const currentLeft = parseFloat(noBtn.style.left) || 0;
    const currentTop = parseFloat(noBtn.style.top) || 0;

    const maxX = viewWidth - buttonWidth - margin;
    const maxY = viewHeight - buttonHeight - margin;

    // Clamp current position to new bounds
    if (currentLeft > maxX) noBtn.style.left = Math.max(margin, maxX) + 'px';
    if (currentTop > maxY) noBtn.style.top = Math.max(margin, maxY) + 'px';
    if (currentLeft < margin) noBtn.style.left = margin + 'px';
    if (currentTop < margin) noBtn.style.top = margin + 'px';
});
