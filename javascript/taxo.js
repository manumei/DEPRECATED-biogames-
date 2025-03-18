document.addEventListener("DOMContentLoaded", () => {
    const startGameBtn = document.getElementById("start-game-btn");
    const menu = document.getElementById("menu");
    const gameContainer = document.getElementById("game-container");
    const organismText = document.getElementById("organism-text");
    const bingoGrid = document.getElementById("bingo-grid");

    const taxonomicCategories = [
        // Domains
        "Bacteria", "Archaea", "Eukaryota",

        // Kingdoms
        "Animalia", "Plantae", "Fungi", "Protista",

        // Phyla (Animalia)
        "Porifera", "Cnidaria", "Platyhelminthes", "Nematoda", "Annelida",
        "Chordata", "Arthropoda", "Echinodermata", "Mollusca",

        // Phyla (Plantae)
        "Bryophyta", "Pteridophyta", "Gymnospermae", "Angiospermae",

        // Phyla (Fungi)
        "Zygomycota", "Ascomycota", "Basidiomycota",

        // Classes (Chordata)
        "Mammalia", "Aves", "Reptilia", "Amphibia", "Chondrichthyes", "Osteichthyes",

        // Classes (Arthropoda)
        "Arachnida", "Insecta", "Crustacea", "Myriapoda",

        // Classes (Mollusca)
        "Gastropoda", "Bivalvia", "Cephalopoda",

        // Classes (Annaelida)
        "Oligochaeta", "Polychaeta", "Hirudinea",

        // Classes (Echinodermata)
        "Asteroidea", "Echinoidea", "Holothuroidea",

        // Classes (Cnidaria)
        "Hydrozoa", "Scyphozoa", "Anthozoa", "Cubozoa",

        // Orders (Arachnida)
        "Araneae", "Scorpiones", "Opiliones", "Acari",

        // Orders (Insecta)
        "Coleoptera", "Lepidoptera", "Diptera", "Hymenoptera", "Hemiptera",

        // Orders (Reptilia)
        "Squamata", "Testudines", "Crocodylia",

        // Orders (Mammalia)
        "Primates", "Carnivora", "Rodentia", "Artiodactyla", "Perissodactyla", "Chiroptera", "Cetacea"
    ];

    // Divided Lists
    const tx_Domains = ["Bacteria", "Archaea", "Eukaryota"];
    const tx_Kingdoms = ["Animalia", "Plantae", "Fungi", "Protista"];
    const tx_PhylaAnimalia = ["Porifera", "Cnidaria", "Platyhelminthes", "Nematoda", "Annelida", "Chordata", "Arthropoda", "Echinodermata", "Mollusca"];
    const tx_PhylaPlantae = ["Bryophyta", "Pteridophyta", "Gymnospermae", "Angiospermae"];
    const tx_PhylaFungi = ["Zygomycota", "Ascomycota", "Basidiomycota"];
    const tx_ClassesChordata = ["Mammalia", "Aves", "Reptilia", "Amphibia", "Chondrichthyes", "Osteichthyes"];
    const tx_ClassesArthropoda = ["Arachnida", "Insecta", "Crustacea", "Myriapoda"];
    const tx_ClassesMollusca = ["Gastropoda", "Bivalvia", "Cephalopoda"];
    const tx_ClassesAnnelida = ["Oligochaeta", "Polychaeta", "Hirudinea"];
    const tx_ClassesEchinodermata = ["Asteroidea", "Echinoidea", "Holothuroidea"];
    const tx_ClassesCnidaria = ["Hydrozoa", "Scyphozoa", "Anthozoa", "Cubozoa"];
    const tx_OrdersArachnida = ["Araneae", "Scorpiones", "Opiliones", "Acari"];
    const tx_OrdersInsecta = ["Coleoptera", "Lepidoptera", "Diptera", "Hymenoptera", "Hemiptera"];
    const tx_OrdersReptilia = ["Squamata", "Testudines", "Crocodylia"];
    const tx_OrdersMammalia = ["Primates", "Carnivora", "Rodentia", "Artiodactyla", "Perissodactyla", "Chiroptera", "Cetacea"];
    

    function generateBingoGrid() {
        bingoGrid.innerHTML = "";
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
        menu.classList.add("hidden"); 
        gameContainer.classList.remove("hidden"); 
        generateBingoGrid(); 
    });
});
