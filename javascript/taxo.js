let organisms = [];
let currentOrganism = null;
let clickLocked = false;

fetch("assets/data/taxonomy.csv")
    .then(response => response.text())
    .then(text => {
        const lines = text.trim().split("\n");
        lines.shift(); // Remove header line

        organisms = lines.map(line => {
            const [name, categoriesString, imagePath] = line.split(",");

            const categories = categoriesString
                .split(";")
                .map(cat => cat.trim().toLowerCase());

            return {
                name: name.trim(),
                categories,
                imagePath: imagePath.trim()
            };
        });
    });

function getRandomOrganism() {
    if (organisms.length === 0) return null;
    return organisms[Math.floor(Math.random() * organisms.length)];
}

function checkWinCondition() {
    const filledCells = document.querySelectorAll(".grid-cell.filled-cell");
    if (filledCells.length === 12) {
        endGame(true);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let filledCount = 0;

    let gameTimer = null;
    let timeRemaining = 0;
    let hardMode = false; // for next step    

    const startGameBtn = document.getElementById("start-game-btn");
    const zoomBtn = document.getElementById("zoom-btn");
    const skipBtn = document.getElementById("skip-button");

    const organismImg = document.getElementById("organism-img");
    const organismText = document.getElementById("organism-text");
    const menu = document.getElementById("menu");
    const gameContainer = document.getElementById("game-container");
    const bingoGrid = document.getElementById("bingo-grid");

    const tx_Domains = ["Bacteria", "Eukaryota"];
    const tx_Kingdoms = ["Animalia", "Plantae", "Fungi", "Protista"];
    const tx_PhylaAnimalia = ["Porifera", "Cnidaria", "Platyhelminthes", "Nematoda", 
                            "Annelida", "Chordata", "Arthropoda", "Echinodermata", "Mollusca"];
    const tx_PhylaPlantae = ["Bryophyta", "Pteridophyta", "Gymnospermae"]; // anGOATspermae ya esta puesta sola
    const tx_ClassesChordata = ["Mammalia", "Aves", "Reptilia", "Amphibia", "Chondrichthyes", "Osteichthyes"];
    const tx_ClassesArthropoda = ["Arachnida", "Insecta", "Crustacea", "Myriapoda"];
    // const tx_ClassesMollusca = ["Gastropoda", "Bivalvia", "Cephalopoda"];
    const tx_OrdersArachnida = ["Araneae", "Scorpiones", "Acari"];
    const tx_OrdersInsecta = ["Coleoptera", "Lepidoptera", "Diptera", "Hymenoptera", "Hemiptera", "Dictyoptera"];
    const tx_OrdersReptilia = ["Squamata", "Testudines", "Crocodilia"];
    const tx_OrdersMammalia = ["Primates", "Carnivora", "Rodentia", "Artiodactyla", "Perissodactyla", "Chiroptera", "Cetacea", "Marsupialia", "Pilosa"]; // eulipotyphla, la de rabbits, etc.
    const angiosperma = "Angiospermae";

    function generateBingoGrid() {
        bingoGrid.innerHTML = "";

        const domainCategory = tx_Domains[Math.floor(Math.random() * tx_Domains.length)];
        const kingdomCategory = tx_Kingdoms[Math.floor(Math.random() * tx_Kingdoms.length)];

        const remainingCategories = [
            ...tx_PhylaAnimalia, ...tx_PhylaPlantae, ...tx_ClassesChordata, ...tx_ClassesArthropoda,
            ...tx_OrdersArachnida, ...tx_OrdersInsecta, ...tx_OrdersReptilia, ...tx_OrdersMammalia
        ];

        const shuffled = remainingCategories.sort(() => 0.5 - Math.random());
        const selectedCategories = shuffled.slice(0, 9); // Reduce to 9 to make space for "angiosperma"
        // const finalCategories = [domainCategory, kingdomCategory, angiosperma, ...selectedCategories];
        const finalCategories = Array(12).fill("Eukaryota");
        finalCategories.sort(() => 0.5 - Math.random());

        finalCategories.forEach(category => {
            const cell = document.createElement("div");
            cell.classList.add("grid-cell");
            cell.textContent = category;
        
            // Clicking on a bingo cell
            cell.addEventListener("click", function handleClick() {
                if (clickLocked) return;
                const catName = category.trim().toLowerCase();
            
                // Debug
                console.log("🧪 Clicked category:", catName);
                console.log("✅ Valid categories for", currentOrganism.name, "→", currentOrganism.categories);

                if (currentOrganism && currentOrganism.categories.includes(catName)) {
                    clickLocked = true;

                    cell.classList.add("filled-cell");
                    cell.innerHTML = "";
            
                    const label = document.createElement("div");
                    label.className = "filled-label";
                    label.textContent = category;
                    cell.appendChild(label);
            
                    const img = document.createElement("img");
                    img.className = "filled-image";
                    img.src = currentOrganism.imagePath;
                    img.alt = currentOrganism.name;
                    cell.appendChild(img);

                    cell.removeEventListener("click", handleClick);

                    filledCount++;
                    if (filledCount === 12) {
                        setTimeout(() => {
                            endGame(true);
                        }, 350);
                    } else {
                        setTimeout(() => {
                            showRandomOrganism();
                            clickLocked = false;
                        }, 350);
                    }

                    // Step 3 will go here
                } else {
                    // 👇 Add shake-red animation
                    cell.classList.add("shake-wrong");
                    setTimeout(() => {
                        cell.classList.remove("shake-wrong");
                    }, 700); // duration of the animation
                }
            });
            bingoGrid.appendChild(cell);
        });
    }

    function showRandomOrganism() {
        currentOrganism = getRandomOrganism();
        if (currentOrganism) {
            organismText.textContent = currentOrganism.name;
            organismImg.src = currentOrganism.imagePath;
            organismImg.alt = currentOrganism.name;
        }
    }

    function endGame(won) {
        clearInterval(gameTimer);
    
        // Disable all grid cells and skip
        document.querySelectorAll(".grid-cell").forEach(cell => cell.classList.add("disabled"));
        document.getElementById("skip-button").disabled = true;
    
        if (won) {
            console.log("🎉 You won! 🎉");
            document.getElementById("win-popup").classList.remove("hidden");
        } else {
            document.getElementById("loss-popup").classList.remove("hidden");
        }
    }    

    const timerButtons = document.querySelectorAll(".timer-btn");
    let selectedTimerValue = 120; // default
    
    timerButtons.forEach(button => {
        button.addEventListener("click", () => {
            timerButtons.forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
    
            const timerAttr = button.getAttribute("timer");
            selectedTimerValue = timerAttr === "None" ? null : parseInt(timerAttr);
        });
    });    

    startGameBtn.addEventListener("click", () => {
        menu.classList.add("hidden");
        gameContainer.classList.remove("hidden");
        generateBingoGrid();
        showRandomOrganism();
    
        if (selectedTimerValue !== null) {
            timeRemaining = selectedTimerValue;
            document.getElementById("time-left").textContent = `${timeRemaining}s`;
    
            gameTimer = setInterval(() => {
                timeRemaining--;
                document.getElementById("time-left").textContent = `${timeRemaining}s`;
    
                if (timeRemaining <= 0) {
                    clearInterval(gameTimer);
                    endGame(false); // loss
                }
            }, 1000);
        } else {
            document.getElementById("timer-display").classList.add("hidden");
        }
    });
    
    zoomBtn.addEventListener("click", () => {
        if (!currentOrganism) return;
    
        const overlay = document.createElement("div");
        overlay.id = "zoom-overlay";
    
        const zoomedImg = document.createElement("img");
        zoomedImg.src = currentOrganism.imagePath;
        zoomedImg.alt = currentOrganism.name;
        zoomedImg.classList.add("zoomed-image");

        zoomedImg.onload = () => {
        };        

        overlay.appendChild(zoomedImg);
        document.body.appendChild(overlay);
    
        overlay.addEventListener("click", () => {
            document.body.removeChild(overlay);
        });
    });

    skipBtn.addEventListener("click", () => {
        showRandomOrganism();
    });

    document.getElementById("close-loss-popup").addEventListener("click", () => {
        document.getElementById("loss-popup").classList.add("hidden");
    });

    document.getElementById("close-win-popup").addEventListener("click", () => {
        document.getElementById("win-popup").classList.add("hidden");
    });    
});
