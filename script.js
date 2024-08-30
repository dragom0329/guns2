let score = 0;
let timeLeft = 10; // 10 seconds countdown
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.createElement('p');
const customPointer = document.getElementById('custom-pointer');
timerDisplay.textContent = `Time left: ${timeLeft}s`;
document.body.insertBefore(timerDisplay, gameArea);

// Update custom pointer position based on mouse movement
document.addEventListener('mousemove', (e) => {
    // Position the custom pointer's center at the mouse position
    customPointer.style.left = `${e.pageX}px`;
    customPointer.style.top = `${e.pageY}px`;
});

function shakeScreen() {
    // Add a shake class to the body
    document.body.classList.add('shake');
    
    // Remove the class after the animation ends
    setTimeout(() => {
        document.body.classList.remove('shake');
    }, 500); // Duration of the shake animation
}

function updateTimer(seconds) {
    timeLeft += seconds;
    if (timeLeft < 0) timeLeft = 0; // Ensure timeLeft doesn't go negative
    timerDisplay.textContent = `Time left: ${timeLeft}s`;
}

function generateTarget() {
    if (timeLeft > 0) {
        // Create a new target element
        const target = document.createElement('div');
        
        // Determine the size and points based on random value
        const size = Math.floor(Math.random() * 3); // 0: small, 1: medium, 2: large
        let points, targetSize, extraTime;
        
        switch (size) {
            case 0: // Small target
                target.classList.add('target', 'small');
                points = 3;
                targetSize = 30;
                extraTime = 1; // Add 1 second
                break;
            case 1: // Medium target
                target.classList.add('target', 'medium');
                points = 2;
                targetSize = 50;
                extraTime = 0.75; // Add 0.75 seconds
                break;
            case 2: // Large target
                target.classList.add('target', 'large');
                points = 1;
                targetSize = 70;
                extraTime = 0.5; // Add 0.5 seconds
                break;
        }

        // Set target's position randomly within the game area, considering the size of the target
        const x = Math.random() * (gameArea.clientWidth - targetSize);
        const y = Math.random() * (gameArea.clientHeight - targetSize);
        target.style.left = `${x}px`;
        target.style.top = `${y}px`;

        // Add target to the game area
        gameArea.appendChild(target);

        // Add click event to the target
        target.addEventListener('click', () => {
            score += points;
            scoreDisplay.textContent = score;
            updateTimer(extraTime); // Add time based on target size
            gameArea.removeChild(target);
            shakeScreen(); // Apply the shake effect
            generateTarget();
        });

        // Remove target after 2 seconds if not clicked
        setTimeout(() => {
            if (gameArea.contains(target)) {
                gameArea.removeChild(target);
                generateTarget();
            }
        }, 2000);
    }
}

function startGame() {
    // Reset score and time
    score = 0;
    timeLeft = 10;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;

    // Clear any existing targets and start countdown
    gameArea.innerHTML = '';
    const countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            endGame();
        }
    }, 1000);

    // Generate the first target
    generateTarget();
}

function endGame() {
    // Clear the game area and show final score
    gameArea.innerHTML = `<p>Your final score is ${score}.</p>`;
    
    // Create and display the "Restart" button
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Play Again';
    restartButton.addEventListener('click', startGame);
    gameArea.appendChild(restartButton);
}

// Start the game when the page loads
startGame();
