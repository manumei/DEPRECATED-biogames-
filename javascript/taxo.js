document.addEventListener("DOMContentLoaded", () => {
    let selectedTime = 120; // Default time in seconds

    const difficultyButtons = document.querySelectorAll(".difficulty-btn");
    const startGameBtn = document.getElementById("start-game-btn");
    const menu = document.getElementById("menu");
    const bingoGrid = document.getElementById("bingo-grid");

    const taxonomicCategories = [
        "Mollusca", "Bacteria", "Angiosperma", "Arachnida", "Protista",
        "Chordata", "Cnidaria", "Echinodermata", "Platyhelminthes", "Annelida",
        "Fungi", "Arthropoda", "Mammalia", "Aves", "Reptilia", "Amphibia",
        "Nematoda", "Bryophyta", "Gymnosperma", "Porifera"
    ];

    function generateBingoGrid() {
        bingoGrid.innerHTML = ""; // Clear previous grid if any
        const shuffled = taxonomicCategories.sort(() => 0.5 - Math.random());
        const selectedCategories = shuffled.slice(0, 12);

        selectedCategories.forEach(category => {
            const cell = document.createElement("div");
            cell.classList.add("grid-cell");
            cell.textContent = category;
            bingoGrid.appendChild(cell);
        });
    }

    startGameBtn.addEventListener("click", () => {
        menu.style.display = "none"; // Hide menu
        bingoGrid.style.display = "grid"; // Show the game grid
        generateBingoGrid(); // Populate grid with random categories
    });
});

