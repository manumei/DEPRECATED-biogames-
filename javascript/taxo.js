let organisms = [];
let currentOrganism = null;

fetch("assets/data/taxonomy.txt")
    .then(response => response.text())
    .then(text => {
        organisms = text.trim().split("\n").map(line => {
            const parts = line.split(", {");
            const name = parts[0].trim();
            const categoriesPart = parts[1].split("},")[0];
            const categories = categoriesPart
                .replace(/\}/g, "") // remove all closing braces
                .split(",")
                .map(cat => cat.trim().toLowerCase());
            const imagePath = line.split("},")[1]
                .replace("{", "")
                .replace("}", "")
                .trim();
            return { name, categories, imagePath };
        });
    });


// Get a random organism from the list
function getRandomOrganism() {
    if (organisms.length === 0) return null;
    return organisms[Math.floor(Math.random() * organisms.length)];
}

document.addEventListener("DOMContentLoaded", () => {
    let filledCount = 0;
    const winPanel = document.getElementById("win-panel");
    const playAgainBtn = document.getElementById("play-again-btn");

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
    const tx_OrdersMammalia = ["Primates", "Carnivora", "Rodentia", "Artiodactyla", "Perissodactyla", "Chiroptera", "Cetacea"];
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
        const finalCategories = [domainCategory, kingdomCategory, angiosperma, ...selectedCategories];
        finalCategories.sort(() => 0.5 - Math.random());

        finalCategories.forEach(category => {
            const cell = document.createElement("div");
            cell.classList.add("grid-cell");
            cell.textContent = category;
        
            // Add click behavior
            cell.addEventListener("click", function handleClick() {
                const catName = category.trim().toLowerCase();

                // 🔍 Debug logs
                console.log("🧪 Clicked category:", catName);
                console.log("✅ Valid categories for", currentOrganism.name, "→", currentOrganism.categories);

                if (currentOrganism && currentOrganism.categories.includes(catName)) {
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
                            winPanel.classList.remove("hidden");
                        }, 350);
                    } else {
                        // 👇 Move to next organism after a short delay
                        setTimeout(() => {
                            showRandomOrganism();
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

    startGameBtn.addEventListener("click", () => {
        menu.classList.add("hidden");
        gameContainer.classList.remove("hidden");
        generateBingoGrid();
        showRandomOrganism();  // ← show one organism when game starts
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
});
