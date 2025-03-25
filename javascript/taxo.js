document.addEventListener("DOMContentLoaded", () => {
    const startGameBtn = document.getElementById("start-game-btn");
    const menu = document.getElementById("menu");
    const gameContainer = document.getElementById("game-container");
    const organismText = document.getElementById("organism-text");
    const bingoGrid = document.getElementById("bingo-grid");

    const taxonomicCategories = [
        // Domains
        "Bacteria", "Eukaryota",

        // Kingdoms
        "Animalia", "Plantae", "Fungi", "Protista",

        // Phyla (Animalia)
        "Porifera", "Cnidaria", "Platyhelminthes", "Nematoda", "Annelida",
        "Chordata", "Arthropoda", "Echinodermata", "Mollusca",

        // Phyla (Plantae)
        "Bryophyta", "Pteridophyta", "Gymnospermae", "Angiospermae",

        // Classes (Chordata)
        "Mammalia", "Aves", "Reptilia", "Amphibia", "Chondrichthyes", "Osteichthyes",

        // Classes (Arthropoda)
        "Arachnida", "Insecta", "Crustacea", "Myriapoda",

        // Classes (Mollusca)
        "Gastropoda", "Bivalvia", "Cephalopoda",

        // Classes (Echinodermata)
        // "Asteroidea", "Echinoidea", "Holothuroidea",

        // Classes (Cnidaria)
        // "Hydrozoa", "Scyphozoa", "Anthozoa", "Cubozoa",

        // Orders (Arachnida)
        "Araneae", "Scorpiones", "Acari", 

        // Orders (Insecta)
        "Coleoptera", "Lepidoptera", "Diptera", "Hymenoptera", "Hemiptera",

        // Orders (Reptilia)
        "Squamata", "Testudines", "Crocodilia",

        // Orders (Mammalia)
        "Primates", "Carnivora", "Rodentia", "Artiodactyla", "Perissodactyla", "Chiroptera", "Cetacea"
    ];

    // Divided Lists
    const tx_Domains = ["Bacteria", "Eukaryota"]; // archaea not included for now cause hard to distinguish for most people
    const tx_Kingdoms = ["Animalia", "Plantae", "Fungi", "Protista"];
    const tx_PhylaAnimalia = ["Porifera", "Cnidaria", "Platyhelminthes", "Nematoda", 
                            "Annelida", "Chordata", "Arthropoda", "Echinodermata", "Mollusca"];
    const tx_PhylaPlantae = ["Bryophyta", "Pteridophyta", "Gymnospermae", "Angiospermae"];
    const tx_ClassesChordata = ["Mammalia", "Aves", "Reptilia", "Amphibia", "Chondrichthyes", "Osteichthyes"];
    const tx_ClassesArthropoda = ["Arachnida", "Insecta", "Crustacea", "Myriapoda"];
    const tx_ClassesMollusca = ["Gastropoda", "Bivalvia", "Cephalopoda"];
    //  const tx_ClassesEchinodermata = ["Asteroidea", "Echinoidea", "Holothuroidea"];
    //  const tx_ClassesCnidaria = ["Hydrozoa", "Scyphozoa", "Anthozoa", "Cubozoa"];
    const tx_OrdersArachnida = ["Araneae", "Scorpiones", "Acari"];
    const tx_OrdersInsecta = ["Coleoptera", "Lepidoptera", "Diptera", "Hymenoptera", "Hemiptera"];
    const tx_OrdersReptilia = ["Squamata", "Testudines", "Crocodilia"];
    const tx_OrdersMammalia = ["Primates", "Carnivora", "Rodentia", "Artiodactyla", "Perissodactyla", "Chiroptera", "Cetacea"];
    



    startGameBtn.addEventListener("click", () => {
        menu.classList.add("hidden"); 
        gameContainer.classList.remove("hidden"); 
        generateBingoGrid();
        showRandomOrganism();
    });
});

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

function showRandomOrganism() {
    if (organisms.length === 0) return;
    currentOrganism = organisms[Math.floor(Math.random() * organisms.length)];
    organismText.textContent = currentOrganism.name;
}

