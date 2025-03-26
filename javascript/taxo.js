let organisms = [];
let currentOrganism = null;

// Load organism data from file
fetch("assets/data/taxo_organisms.txt")
    .then(response => response.text())
    .then(text => {
        organisms = text.trim().split("\n").map(line => {
            const [name, categoryString] = line.split(", {");
            const categories = categoryString
                .replace("}", "")
                .split(",")
                .map(cat => cat.trim().toLowerCase());
            return { name: name.trim(), categories };
        });
    });

// Get a random organism from the list
function getRandomOrganism() {
    if (organisms.length === 0) return null;
    return organisms[Math.floor(Math.random() * organisms.length)];
}

document.addEventListener("DOMContentLoaded", () => {
    const startGameBtn = document.getElementById("start-game-btn");
    const menu = document.getElementById("menu");
    const gameContainer = document.getElementById("game-container");
    const organismText = document.getElementById("organism-text");
    const bingoGrid = document.getElementById("bingo-grid");

    const tx_Domains = ["Bacteria", "Eukaryota"];
    const tx_Kingdoms = ["Animalia", "Plantae", "Fungi", "Protista"];
    const tx_PhylaAnimalia = ["Porifera", "Cnidaria", "Platyhelminthes", "Nematoda", 
                            "Annelida", "Chordata", "Arthropoda", "Echinodermata", "Mollusca"];
    const tx_PhylaPlantae = ["Bryophyta", "Pteridophyta", "Gymnospermae", "Angiospermae"];
    const tx_ClassesChordata = ["Mammalia", "Aves", "Reptilia", "Amphibia", "Chondrichthyes", "Osteichthyes"];
    const tx_ClassesArthropoda = ["Arachnida", "Insecta", "Crustacea", "Myriapoda"];
    const tx_ClassesMollusca = ["Gastropoda", "Bivalvia", "Cephalopoda"];
    const tx_OrdersArachnida = ["Araneae", "Scorpiones", "Acari"];
    const tx_OrdersInsecta = ["Coleoptera", "Lepidoptera", "Diptera", "Hymenoptera", "Hemiptera"];
    const tx_OrdersReptilia = ["Squamata", "Testudines", "Crocodilia"];
    const tx_OrdersMammalia = ["Primates", "Carnivora", "Rodentia", "Artiodactyla", "Perissodactyla", "Chiroptera", "Cetacea"];

    function generateBingoGrid() {
        bingoGrid.innerHTML = "";

        const domainCategory = tx_Domains[Math.floor(Math.random() * tx_Domains.length)];
        const kingdomCategory = tx_Kingdoms[Math.floor(Math.random() * tx_Kingdoms.length)];

        const remainingCategories = [
            ...tx_PhylaAnimalia, ...tx_PhylaPlantae, ...tx_ClassesChordata, ...tx_ClassesArthropoda, ...tx_ClassesMollusca,
            ...tx_OrdersArachnida, ...tx_OrdersInsecta, ...tx_OrdersReptilia, ...tx_OrdersMammalia
        ];

        const shuffled = remainingCategories.sort(() => 0.5 - Math.random());
        const selectedCategories = shuffled.slice(0, 10);
        const finalCategories = [domainCategory, kingdomCategory, ...selectedCategories];
        finalCategories.sort(() => 0.5 - Math.random());

        finalCategories.forEach(category => {
            const cell = document.createElement("div");
            cell.classList.add("grid-cell");
            cell.textContent = category;
        
            // Add click behavior
            cell.addEventListener("click", () => {
                const catName = category.toLowerCase();
                if (currentOrganism && currentOrganism.categories.includes(catName)) {
                    cell.classList.add("crossed-out");
                    cell.removeEventListener("click", () => {}); // disables further action
                    // next organism will be handled in Step 3
                }
            });
        
            bingoGrid.appendChild(cell);
        });
    }

    function showRandomOrganism() {
        currentOrganism = getRandomOrganism();
        if (currentOrganism) {
            organismText.textContent = currentOrganism.name;
        }
    }

    startGameBtn.addEventListener("click", () => {
        menu.classList.add("hidden");
        gameContainer.classList.remove("hidden");
        generateBingoGrid();
        showRandomOrganism();  // ← show one organism when game starts
    });
});
