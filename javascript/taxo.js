document.addEventListener("DOMContentLoaded", () => {
    let selectedTime = 120; // Default time in seconds

    // Select all difficulty buttons
    const difficultyButtons = document.querySelectorAll(".difficulty-btn");
    const startGameBtn = document.getElementById("start-game-btn");

    // Function to handle difficulty selection
    difficultyButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active class from all buttons
            difficultyButtons.forEach(btn => btn.classList.remove("selected"));

            // Add active class to clicked button
            button.classList.add("selected");

            // Update selected time
            selectedTime = parseInt(button.dataset.difficulty);
        });
    });

    // Handle Start Game click
    startGameBtn.addEventListener("click", () => {
        // Hide menu (optional)
        document.getElementById("menu").style.display = "none";

        // Show the timer
        displayTimer(selectedTime);
    });

    // Function to display the timer
    function displayTimer(time) {
        const timerContainer = document.createElement("div");
        timerContainer.id = "timer-container";
        timerContainer.style.fontSize = "32px";
        timerContainer.style.textAlign = "center";
        timerContainer.style.marginTop = "20px";

        document.body.appendChild(timerContainer);

        let countdown = time;
        timerContainer.textContent = `Time: ${countdown}s`;

        const interval = setInterval(() => {
            countdown--;
            timerContainer.textContent = `Time: ${countdown}s`;

            if (countdown <= 0) {
                clearInterval(interval);
                timerContainer.textContent = "Time's up!";
            }
        }, 1000);
    }
});
